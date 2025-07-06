package com.rma.barbersantos.repository;

import com.rma.barbersantos.model.Servico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicoRepository extends JpaRepository<Servico, Long> {
    // Por enquanto, os métodos básicos do JpaRepository são suficientes.
}
