package com.rma.barbersantos.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "agendamentos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) // Muitos agendamentos para UM cliente
    @JoinColumn(name = "id_cliente", nullable = false) // Chave estrangeira
    private Usuario cliente;

    @ManyToOne(fetch = FetchType.LAZY) // Muitos agendamentos para UM barbeiro
    @JoinColumn(name = "id_barbeiro", nullable = false)
    private Usuario barbeiro;

    @ManyToOne(fetch = FetchType.LAZY) // Muitos agendamentos podem ter O MESMO serviço
    @JoinColumn(name = "id_servico", nullable = false)
    private Servico servico;

    @Column(name = "data_hora_agendamento", nullable = false)
    private LocalDateTime dataHoraAgendamento;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusAgendamento status;

    private String observacoes;

    @Column(name = "data_criacao", updatable = false)
    private LocalDateTime dataCriacao;

    @PrePersist
    protected void onCreate() {
        dataCriacao = LocalDateTime.now();
        if (status == null) { // Define um status padrão
            status = StatusAgendamento.AGENDADO;
        }
    }
}