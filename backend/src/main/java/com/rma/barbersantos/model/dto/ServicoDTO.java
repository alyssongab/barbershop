package com.rma.barbersantos.model.dto;

import java.math.BigDecimal;

public record ServicoDTO(
        String nome,
        String descricao,
        BigDecimal preco,
        Integer duracaoEstimadaMin
) {
}
