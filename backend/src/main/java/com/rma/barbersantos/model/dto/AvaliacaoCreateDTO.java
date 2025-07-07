package com.rma.barbersantos.model.dto;

public record AvaliacaoCreateDTO(
        Integer idAgendamento,
        Byte nota,
        String comentario
) {
}
