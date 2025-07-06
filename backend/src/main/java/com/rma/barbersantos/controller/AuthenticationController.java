package com.rma.barbersantos.controller;

import com.rma.barbersantos.model.Usuario;
import com.rma.barbersantos.model.dto.AuthenticationDTO;
import com.rma.barbersantos.model.dto.TokenDTO;
import com.rma.barbersantos.services.TokenService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    public AuthenticationController(AuthenticationManager authenticationManager, TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    @PostMapping
    public ResponseEntity<TokenDTO> login(@RequestBody AuthenticationDTO authDTO) {
        // Cria um objeto de autenticação com o e-mail e a senha recebidos
        var usernamePassword = new UsernamePasswordAuthenticationToken(authDTO.email(), authDTO.senha());

        // O Spring Security usa o AuthenticationManager para validar o usuário.
        // Ele chama nosso AuthenticationService por baixo dos panos para buscar o usuário
        // e compara as senhas usando o BCryptPasswordEncoder.
        var auth = this.authenticationManager.authenticate(usernamePassword);

        // Se a autenticação for bem-sucedida, o objeto 'auth' conterá os dados do usuário.
        // Usamos esses dados para gerar o token.
        var token = tokenService.generateToken((Usuario) auth.getPrincipal());

        return ResponseEntity.ok(new TokenDTO(token));
    }
}
