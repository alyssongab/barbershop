package com.rma.barbersantos.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.rma.barbersantos.model.Usuario;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    // Injeta o valor da nossa chave secreta a partir do application.properties
    @Value("${api.security.token.secret}")
    private String secret;

    public String generateToken(Usuario usuario) {
        try {
            // Define o algoritmo de assinatura usando nossa chave secreta
            Algorithm algorithm = Algorithm.HMAC256(secret);
            String token = JWT.create()
                    .withIssuer("barbearia-api") // Quem está emitindo o token
                    .withSubject(usuario.getEmail()) // O "dono" do token (geralmente o login)
                    .withExpiresAt(genExpirationDate()) // Define a data de expiração
                    .sign(algorithm); // Assina o token
            return token;
        } catch (JWTCreationException exception){
            throw new RuntimeException("Erro ao gerar o token JWT", exception);
        }
    }

    public String validateToken(String token){
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("barbearia-api")
                    .build()
                    .verify(token) // Verifica a assinatura e a expiração
                    .getSubject(); // Se for válido, retorna o "subject" (o email do usuário)
        } catch (JWTVerificationException exception){
            return ""; // Se o token for inválido (expirado, assinatura errada), retorna uma string vazia
        }
    }

    // Método para gerar a data de expiração do token (ex: 2 horas a partir de agora)
    private Instant genExpirationDate(){
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-04:00"));
    }
}
