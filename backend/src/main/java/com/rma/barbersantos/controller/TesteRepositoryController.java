package com.rma.barbersantos.controller;

import com.rma.barbersantos.model.NivelAcesso;
import com.rma.barbersantos.model.Servico;
import com.rma.barbersantos.model.Usuario;
import com.rma.barbersantos.repository.ServicoRepository;
import com.rma.barbersantos.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController // Indica que esta classe é um Controller REST
@RequestMapping("/teste") // Todas as rotas aqui começarão com /teste
public class TesteRepositoryController {

    @Autowired // Spring, por favor, injete uma instância do ServicoRepository aqui
    private ServicoRepository servicoRepository;

    @Autowired // E uma do UsuarioRepository também
    private UsuarioRepository usuarioRepository;

    @GetMapping("/servicos") // Rota: GET http://localhost:8080/teste/servicos
    public ResponseEntity<List<Servico>> listarTodosServicos() {
        List<Servico> servicos = servicoRepository.findAll();
        return ResponseEntity.ok(servicos);
    }

    @GetMapping("/barbeiros") // Rota: GET http://localhost:8080/teste/barbeiros
    public ResponseEntity<List<Usuario>> listarTodosBarbeiros() {
        List<Usuario> barbeiros = usuarioRepository.findByNivelAcesso(NivelAcesso.BARBEIRO);
        return ResponseEntity.ok(barbeiros);
    }
}
