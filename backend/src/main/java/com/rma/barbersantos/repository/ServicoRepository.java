package com.rma.barbersantos.repository;

import com.rma.barbersantos.model.Servico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ServicoRepository extends JpaRepository<Servico, Long> {
    Optional<Servico> findByNome(String nome); // Para a validação de duplicados
}
