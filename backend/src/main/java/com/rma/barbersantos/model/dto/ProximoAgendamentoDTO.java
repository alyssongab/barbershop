package com.rma.barbersantos.model.dto;

import com.rma.barbersantos.model.Agendamento;

import java.time.LocalDateTime;

public record ProximoAgendamentoDTO(
        Integer id,
        LocalDateTime dataHora,
        String nomeServico,
        String nomeCliente
) {
    public ProximoAgendamentoDTO(Agendamento agendamento) {
        this(
                agendamento.getId(),
                agendamento.getDataHoraAgendamento(),
                agendamento.getServico().getNome(),
                agendamento.getCliente().getNome()
        );
    }
}
