package com.rma.barbersantos.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity // Anotação que diz ao JPA que esta classe é uma entidade do banco
@Table(name = "usuarios") // Mapeia para a tabela "usuarios"
@Data // Lombok: gera getters, setters, etc.
@NoArgsConstructor // Lombok: gera um construtor sem argumentos
@AllArgsConstructor // Lombok: gera um construtor com todos os argumentos
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(unique = true) // Garante que o email seja único
    private String email;

    private String senha;

    private String telefone;

    @Enumerated(EnumType.STRING) // Diz ao JPA para salvar o Enum como String ('cliente', 'barbeiro', 'admin')
    @Column(name = "nivel_acesso")
    private NivelAcesso nivelAcesso;

    @Column(name = "data_cadastro", updatable = false)
    private LocalDateTime dataCadastro;

    @PrePersist // Define a data de cadastro automaticamente antes de salvar
    protected void onCreate() {
        dataCadastro = LocalDateTime.now();
    }
}
