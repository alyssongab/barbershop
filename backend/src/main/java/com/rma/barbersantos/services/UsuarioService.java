package com.rma.barbersantos.services;

import com.rma.barbersantos.model.NivelAcesso;
import com.rma.barbersantos.model.Usuario;
import com.rma.barbersantos.model.dto.UsuarioCreateDTO;
import com.rma.barbersantos.model.dto.UsuarioResponseDTO;
import com.rma.barbersantos.model.dto.UsuarioUpdateDTO;
import com.rma.barbersantos.repository.AgendamentoRepository;
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
    private final AgendamentoRepository agendamentoRepository;

    // Atualize o construtor para receber o AgendamentoRepository
    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, AgendamentoRepository agendamentoRepository) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.agendamentoRepository = agendamentoRepository;
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
        if (usuarioRepository.findByEmail(dto.email()).isPresent()) {
            throw new RegraDeNegocioException("O e-mail informado já está em uso.");
        }

        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(dto.nome());
        novoUsuario.setEmail(dto.email());
        novoUsuario.setTelefone(dto.telefone());
        novoUsuario.setNivelAcesso(dto.nivelAcesso());
        novoUsuario.setAtivo(true); // Garante que o barbeiro (ou qualquer usuário) venha ativo por padrão

        // CRIPTOGRAFIA DA SENHA!
        // Aqui está a mágica: usamos o PasswordEncoder para gerar o hash da senha
        String senhaCriptografada = passwordEncoder.encode(dto.senha());
        novoUsuario.setSenha(senhaCriptografada);

        Usuario usuarioSalvo = usuarioRepository.save(novoUsuario);
        return new UsuarioResponseDTO(usuarioSalvo);
    }

    public List<UsuarioResponseDTO> listarBarbeiros() {
        return usuarioRepository.findByNivelAcesso(NivelAcesso.BARBEIRO).stream()
                .map(UsuarioResponseDTO::new)
                .collect(Collectors.toList());
    }

    public Usuario atualizar(Integer id, UsuarioUpdateDTO dto) {
        Usuario usuario = usuarioRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new RecursoNaoEncontradoException("Usuário não encontrado."));

        // Verifica se está tentando atualizar para um e-mail já existente em outro usuário
        usuarioRepository.findByEmail(dto.email())
            .filter(u -> !u.getId().equals(usuario.getId()))
            .ifPresent(u -> { throw new RegraDeNegocioException("O e-mail informado já está em uso."); });

        usuario.setNome(dto.nome());
        usuario.setEmail(dto.email());
        usuario.setTelefone(dto.telefone());

        return usuarioRepository.save(usuario);
    }

    public void deletar(Integer id) {
        Usuario usuario = usuarioRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new RecursoNaoEncontradoException("Usuário não encontrado."));

        // REGRA DE NEGÓCIO: Não permite deletar barbeiro com agendamentos
        if (usuario.getNivelAcesso() == NivelAcesso.BARBEIRO && agendamentoRepository.existsByBarbeiro(usuario)) {
            throw new RegraDeNegocioException("Não é possível excluir um barbeiro que possui agendamentos.");
        }

        usuarioRepository.deleteById(Long.valueOf(id));
    }

    public void toggleStatus(Integer id) {
        Usuario usuario = usuarioRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new RecursoNaoEncontradoException("Usuário não encontrado."));
        usuario.setAtivo(!usuario.isAtivo());
        usuarioRepository.save(usuario);
    }
}