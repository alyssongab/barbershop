package com.rma.barbersantos.model.dto;

import java.math.BigDecimal;

// Informações básicas do serviço
public record ServicoSimplesDTO(Integer id, String nome, BigDecimal preco) {
}