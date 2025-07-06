package com.rma.barbersantos.model.dto;

import com.rma.barbersantos.model.NivelAcesso;

public record UsuarioCreateDTO(
        String nome,
        String email,
        String senha, // Senha em texto plano
        String telefone,
        NivelAcesso nivelAcesso
) {
}
