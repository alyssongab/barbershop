package com.rma.barbersantos.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario implements UserDetails { // Implementa a interface UserDetails

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // ... outros campos (nome, email, etc.) sem alteração
    private String nome;
    @Column(unique = true)
    private String email;
    private String senha;
    private String telefone;
    @Enumerated(EnumType.STRING)
    @Column(name = "nivel_acesso")
    private NivelAcesso nivelAcesso;
    @Column(name = "data_cadastro", updatable = false)
    private LocalDateTime dataCadastro;

    @PrePersist
    protected void onCreate() {
        dataCadastro = LocalDateTime.now();
    }

    // MÉTODOS DA INTERFACE UserDetails

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Define os "papéis" ou "permissões" do usuário.
        // No nosso caso, o papel é o próprio NivelAcesso (ex: ROLE_ADMIN, ROLE_BARBEIRO).
        return List.of(new SimpleGrantedAuthority("ROLE_" + nivelAcesso.name()));
    }

    @Override
    public String getPassword() {
        return this.senha; // Retorna a senha (já criptografada)
    }

    @Override
    public String getUsername() {
        return this.email; // O "username" para o Spring Security será o e-mail
    }

    // Os métodos abaixo controlam o status da conta. Por enquanto, deixaremos todos como 'true'.
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
