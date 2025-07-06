package com.rma.barbersantos.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration // Indica que esta é uma classe de configuração do Spring
@EnableWebSecurity // Habilita a segurança web do Spring
public class SecurityConfig {

    private final SecurityFilter securityFilter;

    public SecurityConfig(SecurityFilter securityFilter) {
        this.securityFilter = securityFilter;
    }

    /**
     * Este Bean define o algoritmo de hashing que usaremos (BCrypt).
     * Ao defini-lo como um Bean, podemos injetá-lo em qualquer parte da nossa aplicação,
     * como no serviço de usuário para codificar a senha antes de salvar.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // NOVO BEAN: Expõe o AuthenticationManager
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    /**
     * Este é o coração da nossa configuração de segurança. Ele define como as requisições HTTP
     * serão tratadas.
     */

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        // Rotas Públicas: Permitimos o acesso sem autenticação
                        .requestMatchers(HttpMethod.POST, "/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/usuarios").permitAll() // Permitir que novos usuários se cadastrem

                        // Rotas de ADMIN: Apenas usuários com o papel 'ADMIN' podem acessar
                        .requestMatchers(HttpMethod.POST, "/servicos").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/servicos/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/servicos/**").hasRole("ADMIN")

                        // Rotas de CLIENTE: Apenas usuários com o papel 'CLIENTE' podem criar agendamentos
                        .requestMatchers(HttpMethod.POST, "/agendamentos").hasRole("CLIENTE")

                        // Qualquer outra requisição precisa estar autenticada
                        .anyRequest().authenticated()
                )
                // Adicionamos nosso filtro personalizado para ser executado ANTES do filtro padrão de autenticação do Spring
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
