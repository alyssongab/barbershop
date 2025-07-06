package com.rma.barbersantos.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration // Indica que esta é uma classe de configuração do Spring
@EnableWebSecurity // Habilita a segurança web do Spring
public class SecurityConfig {

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
                // Desabilitamos o CSRF, pois nossa API será stateless (não usará sessões/cookies).
                // A autenticação será feita por outros meios, como tokens JWT, no futuro.
                .csrf(csrf -> csrf.disable())

                // Configuramos a política de gerenciamento de sessão para stateless.
                // A API não criará ou usará nenhuma sessão HTTP.
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Configuramos as regras de autorização para as requisições HTTP.
                .authorizeHttpRequests(authorize -> authorize
                                // Por enquanto, vamos permitir o acesso a TODOS os endpoints sem autenticação.
                                // Isso nos permite continuar desenvolvendo e testando os controllers existentes.
                                // No futuro, mudaremos isso para proteger rotas específicas.
                                .requestMatchers("/**").permitAll()
                        // .anyRequest().authenticated() // Usaríamos isso para exigir autenticação para qualquer outra rota.
                )
                .build();
    }
}
