package com.rma.barbersantos.repository;

import com.rma.barbersantos.model.NivelAcesso;
import com.rma.barbersantos.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository // Anotação que indica ao Spring que esta é uma interface de repositório
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // JpaRepository<TipoDaEntidade, TipoDoIdDaEntidade>

    /*
     * MÁGICA DO SPRING DATA JPA:
     * O Spring lê o nome do método e cria a consulta automaticamente.
     * "findByNivelAcesso" será traduzido para:
     * SELECT * FROM usuarios WHERE nivel_acesso = ?
     */
    List<Usuario> findByNivelAcesso(NivelAcesso nivelAcesso);

    /*
     * Outro exemplo: buscar um usuário pelo email
     * "findByEmail" será traduzido para:
     * SELECT * FROM usuarios WHERE email = ?
     */
    Usuario findByEmail(String email);
}