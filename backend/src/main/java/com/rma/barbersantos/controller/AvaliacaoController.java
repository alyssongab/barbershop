package com.rma.barbersantos.controller;

import com.rma.barbersantos.model.Avaliacao;
import com.rma.barbersantos.model.Usuario;
import com.rma.barbersantos.model.dto.AvaliacaoCreateDTO;
import com.rma.barbersantos.model.dto.AvaliacaoDTO;
import com.rma.barbersantos.services.AvaliacaoService;
import com.rma.barbersantos.services.exceptions.RecursoNaoEncontradoException;
import com.rma.barbersantos.services.exceptions.RegraDeNegocioException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/avaliacoes")
public class AvaliacaoController {

    private final AvaliacaoService avaliacaoService;

    public AvaliacaoController(AvaliacaoService avaliacaoService) {
        this.avaliacaoService = avaliacaoService;
    }

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody AvaliacaoCreateDTO dto, @AuthenticationPrincipal Usuario usuarioLogado) {
        try {
            Avaliacao avaliacao = avaliacaoService.criar(dto.idAgendamento(), dto.nota(), dto.comentario(), usuarioLogado);
            return ResponseEntity.status(HttpStatus.CREATED).body(new AvaliacaoDTO(avaliacao));
        } catch (RegraDeNegocioException | RecursoNaoEncontradoException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
