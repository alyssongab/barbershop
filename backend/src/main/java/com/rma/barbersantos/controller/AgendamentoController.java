package com.rma.barbersantos.controller;

import com.rma.barbersantos.model.Agendamento;
import com.rma.barbersantos.model.dto.AgendamentoDTO;
import com.rma.barbersantos.model.dto.AgendamentoResponseDTO;
import com.rma.barbersantos.model.dto.ProximoAgendamentoDTO;
import com.rma.barbersantos.services.AgendamentoService;
import com.rma.barbersantos.services.exceptions.RecursoNaoEncontradoException;
import com.rma.barbersantos.services.exceptions.RegraDeNegocioException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/agendamentos")
public class AgendamentoController {

    private final AgendamentoService agendamentoService;

    public AgendamentoController(AgendamentoService agendamentoService) {
        this.agendamentoService = agendamentoService;
    }

    // para o CLIENTE criar agendamentos
    @PostMapping
    public ResponseEntity<?> criarAgendamento(@RequestBody AgendamentoDTO agendamentoDTO) {
        try {
            // A lógica do serviço continua a mesma, ele retorna a entidade completa
            Agendamento novoAgendamento = agendamentoService.criar(agendamentoDTO);

            // ANTES de enviar de volta, convertemos a entidade para o DTO de resposta seguro
            AgendamentoResponseDTO responseDTO = new AgendamentoResponseDTO(novoAgendamento);

            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                    .buildAndExpand(novoAgendamento.getId()).toUri();

            // Retornamos o DTO no corpo da resposta
            return ResponseEntity.created(location).body(responseDTO);

        } catch (RegraDeNegocioException | RecursoNaoEncontradoException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // NOVO ENDPOINT para a homepage do barbeiro
    @GetMapping("/proximos")
    public ResponseEntity<List<ProximoAgendamentoDTO>> listarProximos() {
        var proximos = agendamentoService.listarProximosDoBarbeiro();
        return ResponseEntity.ok(proximos);
    }

    // ----------------------------------------------------------------
    // ENDPOINTS DE LISTAGEM POR PERFIL
    // ----------------------------------------------------------------

    // Endpoint para o ADMIN
    @GetMapping("/admin/todos")
    public ResponseEntity<List<AgendamentoResponseDTO>> listarTodosParaAdmin() {
        var agendamentos = agendamentoService.listarTodosParaAdmin();
        return ResponseEntity.ok(agendamentos);
    }

    // Endpoint para o CLIENTE
    @GetMapping("/meus-agendamentos")
    public ResponseEntity<List<AgendamentoResponseDTO>> listarDoCliente() {
        var agendamentos = agendamentoService.listarPorCliente();
        return ResponseEntity.ok(agendamentos);
    }

    @GetMapping("/horarios-disponiveis")
    public ResponseEntity<List<String>> getHorariosDisponiveis(
            @RequestParam Integer barbeiroId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data) {

        List<String> horarios = agendamentoService.buscarHorariosDisponiveis(barbeiroId, data);
        return ResponseEntity.ok(horarios);
    }

    // Endpoint para o BARBEIRO
    @GetMapping("/minha-agenda")
    public ResponseEntity<List<AgendamentoResponseDTO>> listarDoBarbeiro() {
        var agendamentos = agendamentoService.listarPorBarbeiro();
        return ResponseEntity.ok(agendamentos);
    }

    // ----------------------------------------------------------------
    // ENDPOINTS DE ITEM ÚNICO
    // ----------------------------------------------------------------

    // Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Integer id) {
        try {
            AgendamentoResponseDTO agendamento = agendamentoService.buscarPorId(id);
            return ResponseEntity.ok(agendamento);
        } catch (RecursoNaoEncontradoException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    // Cancelar (usando PATCH, pois é uma atualização parcial de status)
    @PatchMapping("/{id}/cancelar")
    public ResponseEntity<?> cancelarAgendamento(@PathVariable Integer id, @RequestParam(defaultValue = "false") boolean peloSalao) {
        try {
            AgendamentoResponseDTO agendamentoCancelado = agendamentoService.cancelar(id, peloSalao);
            return ResponseEntity.ok(agendamentoCancelado);
        } catch (RecursoNaoEncontradoException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (RegraDeNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
