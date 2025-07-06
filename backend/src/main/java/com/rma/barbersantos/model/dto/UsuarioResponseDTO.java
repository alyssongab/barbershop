package com.rma.barbersantos.model.dto;

import com.rma.barbersantos.model.NivelAcesso;
import com.rma.barbersantos.model.Usuario;

import java.time.LocalDateTime;

public record UsuarioResponseDTO(
        Integer id,
        String nome,
        String email,
        String telefone,
        NivelAcesso nivelAcesso,
        LocalDateTime dataCadastro
) {
    // Construtor para facilitar a conversão da Entidade para o DTO
    public UsuarioResponseDTO(Usuario usuario) {
        this(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getTelefone(),
                usuario.getNivelAcesso(),
                usuario.getDataCadastro()
        );
    }
}
