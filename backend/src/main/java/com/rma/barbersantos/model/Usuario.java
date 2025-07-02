package com.rma.barbersantos.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false)
    private String senha;

    @Column(length = 20)
    private String telefone;

    @Enumerated(EnumType.STRING)
    @Column(name = "nivel_acesso", nullable = false)
    private NivelAcesso nivelAcesso;

    @Column(name = "data_cadastro", updatable = false)
    private LocalDateTime dataCadastro;

    @OneToMany(mappedBy = "cliente")
    private List<Agendamento> agendamentosComoCliente;

    @OneToMany(mappedBy = "barbeiro")
    private List<Agendamento> agendamentosComoBarbeiro;

    // Construtor padrão exigido pelo JPA
    public Usuario() {
    }

    // Getters e Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public NivelAcesso getNivelAcesso() {
        return nivelAcesso;
    }

    public void setNivelAcesso(NivelAcesso nivelAcesso) {
        this.nivelAcesso = nivelAcesso;
    }

    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public List<Agendamento> getAgendamentosComoCliente() {
        return agendamentosComoCliente;
    }

    public void setAgendamentosComoCliente(List<Agendamento> agendamentosComoCliente) {
        this.agendamentosComoCliente = agendamentosComoCliente;
    }

    public List<Agendamento> getAgendamentosComoBarbeiro() {
        return agendamentosComoBarbeiro;
    }

    public void setAgendamentosComoBarbeiro(List<Agendamento> agendamentosComoBarbeiro) {
        this.agendamentosComoBarbeiro = agendamentosComoBarbeiro;
    }

    @PrePersist
    protected void onCreate() {
        dataCadastro = LocalDateTime.now();
    }
}