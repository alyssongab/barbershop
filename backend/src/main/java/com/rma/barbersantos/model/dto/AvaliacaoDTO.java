package com.rma.barbersantos.model.dto;

import com.rma.barbersantos.model.Avaliacao;

import java.time.LocalDateTime;

public record AvaliacaoDTO(
        Integer nota,
        String comentario,
        LocalDateTime dataAvaliacao
) {
    public AvaliacaoDTO(Avaliacao avaliacao) {
        this(Integer.valueOf(avaliacao.getNota()), avaliacao.getComentario(), avaliacao.getDataAvaliacao());
    }
}
