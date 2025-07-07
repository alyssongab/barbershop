package com.rma.barbersantos.security;

import com.rma.barbersantos.repository.UsuarioRepository;
import com.rma.barbersantos.services.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component // Marcamos como um componente genérico do Spring
public class SecurityFilter extends OncePerRequestFilter {

    private final TokenService tokenService;
    private final UsuarioRepository usuarioRepository;

    // Could not autowire. No beans of 'TokenService' type found.
    public SecurityFilter(TokenService tokenService, UsuarioRepository usuarioRepository) {
        this.tokenService = tokenService;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var token = this.recoverToken(request);
        if (token != null) {
            var email = tokenService.validateToken(token);

            // Buscamos o usuário e recebemos um Optional
            var optionalUser = usuarioRepository.findByEmail(email);

            // Usamos o método .ifPresent() do Optional.
            // O código dentro dele só será executado se o Optional não estiver vazio.
            optionalUser.ifPresent(user -> {
                // A variável 'user' aqui é o UserDetails real, "desembrulhado" do Optional.
                var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            });
        }

        // Continua a cadeia de filtros, independentemente de ter encontrado o usuário ou não.
        filterChain.doFilter(request, response);
    }

    // Método para extrair o token do cabeçalho "Authorization"
    private String recoverToken(HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");
        if (authHeader == null) return null;
        // O token vem no formato "Bearer <token>", então removemos o prefixo
        return authHeader.replace("Bearer ", "");
    }
}