package com.rma.barbersantos.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

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
                // Desabilitamos CSRF pois usaremos autenticação stateless (via token)
                .csrf(AbstractHttpConfigurer::disable)

                // Habilitamos a configuração de CORS que definimos no bean abaixo
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // Definimos a política de sessão como stateless
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Definimos as regras de autorização para cada endpoint
                .authorizeHttpRequests(authorize -> authorize
                        // Permite as requisições de preflight (OPTIONS)
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Rotas Públicas
                        .requestMatchers(HttpMethod.POST, "/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/usuarios").permitAll()

                        // Rotas de ADMIN
                        .requestMatchers("/servicos/**").hasRole("ADMIN")
                        .requestMatchers("/agendamentos/admin/**").hasRole("ADMIN")

                        // Rotas de BARBEIRO
                        .requestMatchers("/agendamentos/proximos").hasRole("BARBEIRO")
                        .requestMatchers("/agendamentos/minha-agenda").hasRole("BARBEIRO")

                        // Rotas de CLIENTE
                        .requestMatchers(HttpMethod.POST, "/agendamentos").hasRole("CLIENTE")
                        .requestMatchers("/agendamentos/meus-agendamentos").hasRole("CLIENTE")

                        // Qualquer outra requisição precisa estar autenticada
                        .anyRequest().authenticated()
                )
                // Adicionamos nosso filtro de segurança antes do filtro padrão do Spring
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    // NOVO BEAN: Define a configuração de CORS para a aplicação
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Define as origens permitidas (seu frontend Next.js)
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        // Define os métodos HTTP permitidos
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        // Define os cabeçalhos permitidos
        configuration.setAllowedHeaders(List.of("*"));
        // Permite o envio de credenciais (necessário para autenticação baseada em token/cookie)
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Aplica a configuração a todos os endpoints ("/**")
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
