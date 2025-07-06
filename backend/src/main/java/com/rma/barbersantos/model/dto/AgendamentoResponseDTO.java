package com.rma.barbersantos.model.dto;

import com.rma.barbersantos.model.Agendamento;
import com.rma.barbersantos.model.StatusAgendamento;

import java.time.LocalDateTime;

// Este é o objeto que será de fato convertido para JSON e enviado ao frontend
public record AgendamentoResponseDTO(
        Integer id,
        UsuarioSimplesDTO cliente,
        UsuarioSimplesDTO barbeiro,
        ServicoSimplesDTO servico,
        LocalDateTime dataHoraAgendamento,
        StatusAgendamento status,
        String observacoes
) {
    // Construtor auxiliar para facilitar a conversão da Entidade para o DTO
    public AgendamentoResponseDTO(Agendamento agendamento) {
        this(
                agendamento.getId(),
                new UsuarioSimplesDTO(agendamento.getCliente().getId(), agendamento.getCliente().getNome()),
                new UsuarioSimplesDTO(agendamento.getBarbeiro().getId(), agendamento.getBarbeiro().getNome()),
                new ServicoSimplesDTO(agendamento.getServico().getId(), agendamento.getServico().getNome(), agendamento.getServico().getPreco()),
                agendamento.getDataHoraAgendamento(),
                agendamento.getStatus(),
                agendamento.getObservacoes()
        );
    }
}
