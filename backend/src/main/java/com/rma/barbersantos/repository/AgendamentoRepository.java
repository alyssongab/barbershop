package com.rma.barbersantos.repository;

import com.rma.barbersantos.model.Agendamento;
import com.rma.barbersantos.model.Servico;
import com.rma.barbersantos.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Integer> { // Lembre-se que mudamos para Integer

    // Busca agendamentos de um cliente específico
    List<Agendamento> findByCliente(Usuario cliente);

    // Busca agendamentos de um barbeiro específico
    List<Agendamento> findByBarbeiro(Usuario barbeiro);

    // NOVA CONSULTA: Mais robusta para detectar conflitos de horário.
    // Ela busca por agendamentos do mesmo barbeiro que se sobrepõem ao novo intervalo de tempo.
    @Query("SELECT a FROM Agendamento a WHERE a.barbeiro = :barbeiro AND a.dataHoraAgendamento < :horaFim AND FUNCTION('ADDTIME', a.dataHoraAgendamento, FUNCTION('SEC_TO_TIME', a.servico.duracaoEstimadaMin * 60)) > :horaInicio")
    List<Agendamento> findOverlappingAppointments(Usuario barbeiro, LocalDateTime horaInicio, LocalDateTime horaFim);

    boolean existsByServico(Servico servico); // Para a validação de exclusão
}
