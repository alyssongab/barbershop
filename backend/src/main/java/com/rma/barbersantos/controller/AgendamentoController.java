package com.rma.barbersantos.controller;

import com.rma.barbersantos.model.Agendamento;
import com.rma.barbersantos.model.dto.AgendamentoDTO;
import com.rma.barbersantos.model.dto.AgendamentoResponseDTO;
import com.rma.barbersantos.services.AgendamentoService;
import com.rma.barbersantos.services.exceptions.RecursoNaoEncontradoException;
import com.rma.barbersantos.services.exceptions.RegraDeNegocioException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/agendamentos")
public class AgendamentoController {

    private final AgendamentoService agendamentoService;

    public AgendamentoController(AgendamentoService agendamentoService) {
        this.agendamentoService = agendamentoService;
    }

    // Criar
    @PostMapping
    public ResponseEntity<?> criarAgendamento(@RequestBody AgendamentoDTO agendamentoDTO) {
        try {
            Agendamento novoAgendamento = agendamentoService.criar(agendamentoDTO);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                    .buildAndExpand(novoAgendamento.getId()).toUri();
            return ResponseEntity.created(location).body(novoAgendamento);
        } catch (RegraDeNegocioException | RecursoNaoEncontradoException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Listar todos
    @GetMapping
    public ResponseEntity<List<AgendamentoResponseDTO>> listarTodos() {
        List<AgendamentoResponseDTO> agendamentos = agendamentoService.listarTodos();
        return ResponseEntity.ok(agendamentos);
    }

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
