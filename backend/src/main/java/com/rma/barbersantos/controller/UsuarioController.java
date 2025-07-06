package com.rma.barbersantos.controller;

import com.rma.barbersantos.model.dto.UsuarioCreateDTO;
import com.rma.barbersantos.model.dto.UsuarioResponseDTO;
import com.rma.barbersantos.services.UsuarioService;
import com.rma.barbersantos.services.exceptions.RecursoNaoEncontradoException;
import com.rma.barbersantos.services.exceptions.RegraDeNegocioException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<?> criarUsuario(@RequestBody UsuarioCreateDTO dto) {
        try {
            UsuarioResponseDTO novoUsuario = usuarioService.criar(dto);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                    .buildAndExpand(novoUsuario.id()).toUri();
            return ResponseEntity.created(location).body(novoUsuario);
        } catch (RegraDeNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<UsuarioResponseDTO>> listarTodos() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(usuarioService.buscarPorId(id));
        } catch (RecursoNaoEncontradoException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
