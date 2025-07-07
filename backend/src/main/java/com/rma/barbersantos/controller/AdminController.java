package com.rma.barbersantos.controller;

import com.rma.barbersantos.model.Usuario;
import com.rma.barbersantos.model.dto.UsuarioCreateDTO;
import com.rma.barbersantos.model.dto.UsuarioResponseDTO;
import com.rma.barbersantos.model.dto.UsuarioUpdateDTO;
import com.rma.barbersantos.services.UsuarioService;
import com.rma.barbersantos.services.exceptions.RegraDeNegocioException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Map;

@RestController
@RequestMapping("/admin") // Todas as rotas aqui começarão com /admin
@PreAuthorize("hasRole('ADMIN')") // Garante que SÓ ADMINS podem acessar este controller
public class AdminController {

    private final UsuarioService usuarioService;

    public AdminController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // O método de criar usuário agora vive aqui, de forma segura.
    @PostMapping("/usuarios")
    public ResponseEntity<?> criarUsuarioPeloAdmin(@RequestBody UsuarioCreateDTO dto) {
        try {
            UsuarioResponseDTO novoUsuario = usuarioService.criar(dto);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                    .buildAndExpand(novoUsuario.id()).toUri();
            return ResponseEntity.created(location).body(novoUsuario);
        } catch (RegraDeNegocioException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Atualizar usuário (barbeiro) pelo admin
    @PutMapping("/usuarios/{id}")
    public ResponseEntity<?> atualizarUsuarioPeloAdmin(@PathVariable Integer id, @RequestBody UsuarioUpdateDTO dto) {
        try {
            Usuario usuarioAtualizado = usuarioService.atualizar(id, dto);
            return ResponseEntity.ok(new UsuarioResponseDTO(usuarioAtualizado));
        } catch (RegraDeNegocioException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        }
    }

    // Deletar usuário (barbeiro) pelo admin
    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<?> deletarUsuarioPeloAdmin(@PathVariable Integer id) {
        try {
            usuarioService.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (RegraDeNegocioException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        }
    }

    // Ativar/desativar usuário (barbeiro) pelo admin
    @PatchMapping("/usuarios/{id}/toggle-status")
    public ResponseEntity<?> toggleStatusUsuarioPeloAdmin(@PathVariable Integer id) {
        try {
            usuarioService.toggleStatus(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        }
    }
}