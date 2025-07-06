package com.rma.barbersantos.controller;

import com.rma.barbersantos.model.Servico;
import com.rma.barbersantos.model.dto.ServicoDTO;
import com.rma.barbersantos.services.ServicoService;
import com.rma.barbersantos.services.exceptions.RecursoNaoEncontradoException;
import com.rma.barbersantos.services.exceptions.RegraDeNegocioException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/servicos")
public class ServicoController {

    private final ServicoService servicoService;

    public ServicoController(ServicoService servicoService) {
        this.servicoService = servicoService;
    }

    @GetMapping
    public ResponseEntity<List<Servico>> listarTodos() {
        return ResponseEntity.ok(servicoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(servicoService.buscarPorId(id));
        } catch (RecursoNaoEncontradoException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody ServicoDTO dto) {
        try {
            Servico novoServico = servicoService.criar(dto);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                    .buildAndExpand(novoServico.getId()).toUri();
            return ResponseEntity.created(location).body(novoServico);
        } catch (RegraDeNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Integer id, @RequestBody ServicoDTO dto) {
        try {
            Servico servicoAtualizado = servicoService.atualizar(id, dto);
            return ResponseEntity.ok(servicoAtualizado);
        } catch (RecursoNaoEncontradoException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Integer id) {
        try {
            servicoService.deletar(id);
            return ResponseEntity.noContent().build(); // Status 204 No Content
        } catch (RecursoNaoEncontradoException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (RegraDeNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
