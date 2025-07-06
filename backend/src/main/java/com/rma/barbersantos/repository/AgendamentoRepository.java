package com.rma.barbersantos.repository;

import com.rma.barbersantos.model.Agendamento;
import com.rma.barbersantos.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

    // Busca agendamentos de um cliente específico
    List<Agendamento> findByCliente(Usuario cliente);

    // Busca agendamentos de um barbeiro específico
    List<Agendamento> findByBarbeiro(Usuario barbeiro);

    // Exemplo de uma consulta mais complexa com a anotação @Query
    // Busca os agendamentos de um barbeiro em um determinado período de tempo
    @Query("SELECT a FROM Agendamento a WHERE a.barbeiro = :barbeiro AND a.dataHoraAgendamento BETWEEN :inicio AND :fim")
    List<Agendamento> findByBarbeiroAndDataHoraAgendamentoBetween(Usuario barbeiro, LocalDateTime inicio, LocalDateTime fim);
}
