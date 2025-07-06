package com.rma.barbersantos.services;

import com.rma.barbersantos.model.Usuario;
import com.rma.barbersantos.model.dto.UsuarioCreateDTO;
import com.rma.barbersantos.model.dto.UsuarioResponseDTO;
import com.rma.barbersantos.repository.UsuarioRepository;
import com.rma.barbersantos.services.exceptions.RecursoNaoEncontradoException;
import com.rma.barbersantos.services.exceptions.RegraDeNegocioException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder; // Injetamos o codificador de senhas

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UsuarioResponseDTO> listarTodos() {
        return usuarioRepository.findAll().stream()
                .map(UsuarioResponseDTO::new)
                .collect(Collectors.toList());
    }

    public UsuarioResponseDTO buscarPorId(Integer id) {
        Usuario usuario = usuarioRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new RecursoNaoEncontradoException("Usuário com ID " + id + " não encontrado."));
        return new UsuarioResponseDTO(usuario);
    }

    public UsuarioResponseDTO criar(UsuarioCreateDTO dto) {
        // Validação: Impede a criação de usuários com emails duplicados
        if (usuarioRepository.findByEmail(dto.email()) != null) {
            throw new RegraDeNegocioException("O e-mail informado já está em uso.");
        }

        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(dto.nome());
        novoUsuario.setEmail(dto.email());
        novoUsuario.setTelefone(dto.telefone());
        novoUsuario.setNivelAcesso(dto.nivelAcesso());

        // CRIPTOGRAFIA DA SENHA!
        // Aqui está a mágica: usamos o PasswordEncoder para gerar o hash da senha
        String senhaCriptografada = passwordEncoder.encode(dto.senha());
        novoUsuario.setSenha(senhaCriptografada);

        Usuario usuarioSalvo = usuarioRepository.save(novoUsuario);
        return new UsuarioResponseDTO(usuarioSalvo);
    }

    // A lógica de "atualizar" e "deletar" pode ser adicionada aqui seguindo o mesmo padrão.
    // Por enquanto, vamos focar na criação e listagem.
}