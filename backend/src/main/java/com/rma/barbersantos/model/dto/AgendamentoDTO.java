package com.rma.barbersantos.model.dto;

import java.time.LocalDateTime;

// Usamos um 'record' do Java 17+ que é perfeito para DTOs.
// Ele é imutável e já vem com construtor, getters, equals, hashCode e toString.
public record AgendamentoDTO(
        Integer idCliente,
        Integer idBarbeiro,
        Integer idServico,
        LocalDateTime dataHoraAgendamento,
        String observacoes
) {
}
