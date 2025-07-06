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
            var email = tokenService.validateToken(token); // Valida o token
            UserDetails user = usuarioRepository.findByEmail(email); // Busca o usuário

            if (user != null) {
                // Se o usuário existe, cria um objeto de autenticação
                var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                // E o define no contexto de segurança do Spring, autenticando o usuário para esta requisição
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        // Continua a cadeia de filtros, permitindo que a requisição prossiga
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