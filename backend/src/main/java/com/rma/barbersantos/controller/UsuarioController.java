package com.rma.barbersantos.controller;

import com.rma.barbersantos.model.Usuario;
import com.rma.barbersantos.model.dto.UsuarioCreateDTO;
import com.rma.barbersantos.model.dto.UsuarioResponseDTO;
import com.rma.barbersantos.model.dto.UsuarioUpdateDTO;
import com.rma.barbersantos.services.UsuarioService;
import com.rma.barbersantos.services.exceptions.RecursoNaoEncontradoException;
import com.rma.barbersantos.services.exceptions.RegraDeNegocioException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<?> criarUsuario(@RequestBody UsuarioCreateDTO dto) { // Use o seu DTO correto aqui
        try {
            UsuarioResponseDTO novoUsuario = usuarioService.criar(dto);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                    .buildAndExpand(novoUsuario.id()).toUri();
            return ResponseEntity.created(location).body(novoUsuario);
        } catch (RegraDeNegocioException e) {
            // ANTES:
            // return ResponseEntity.badRequest().body(e.getMessage());

            // DEPOIS: Retorna um objeto JSON com a chave "error"
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
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

    @GetMapping("/me")
    public ResponseEntity<UsuarioResponseDTO> getAuthenticatedUser(@AuthenticationPrincipal Usuario usuario) {
        // O @AuthenticationPrincipal injeta diretamente o objeto Usuario que foi
        // carregado pelo SecurityFilter a partir do token. É limpo e eficiente.
        UsuarioResponseDTO usuarioDTO = new UsuarioResponseDTO(usuario);
        return ResponseEntity.ok(usuarioDTO);
    }

    @GetMapping("/barbeiros")
    public ResponseEntity<List<UsuarioResponseDTO>> listarBarbeiros() {
        // Vamos delegar a lógica para o serviço
        return ResponseEntity.ok(usuarioService.listarBarbeiros());
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> atualizarUsuario(@PathVariable Integer id, @RequestBody UsuarioUpdateDTO dto) {
        try {
            Usuario usuarioAtualizado = usuarioService.atualizar(id, dto);
            return ResponseEntity.ok(new UsuarioResponseDTO(usuarioAtualizado));
        } catch (RecursoNaoEncontradoException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarUsuario(@PathVariable Integer id) {
        try {
            usuarioService.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (RegraDeNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RecursoNaoEncontradoException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/toggle-status")
    public ResponseEntity<?> toggleStatus(@PathVariable Integer id) {
        try {
            usuarioService.toggleStatus(id);
            return ResponseEntity.noContent().build();
        } catch (RecursoNaoEncontradoException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
