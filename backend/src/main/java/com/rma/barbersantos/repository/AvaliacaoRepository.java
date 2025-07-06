package com.rma.barbersantos.repository;

import com.rma.barbersantos.model.Avaliacao;
import com.rma.barbersantos.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {

    // Busca todas as avaliações dadas para um barbeiro específico
    @Query("SELECT av FROM Avaliacao av WHERE av.agendamento.barbeiro = :barbeiro")
    List<Avaliacao> findByBarbeiro(Usuario barbeiro);
}
