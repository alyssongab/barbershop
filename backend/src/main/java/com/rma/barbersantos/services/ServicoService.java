package com.rma.barbersantos.services;

import com.rma.barbersantos.model.Servico;
import com.rma.barbersantos.model.dto.ServicoDTO;
import com.rma.barbersantos.repository.AgendamentoRepository;
import com.rma.barbersantos.repository.ServicoRepository;
import com.rma.barbersantos.services.exceptions.RecursoNaoEncontradoException;
import com.rma.barbersantos.services.exceptions.RegraDeNegocioException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicoService {

    private final ServicoRepository servicoRepository;
    private final AgendamentoRepository agendamentoRepository; // Injetado para a regra de negócio

    public ServicoService(ServicoRepository servicoRepository, AgendamentoRepository agendamentoRepository) {
        this.servicoRepository = servicoRepository;
        this.agendamentoRepository = agendamentoRepository;
    }

    public List<Servico> listarTodos() {
        return servicoRepository.findAll();
    }

    public Servico buscarPorId(Integer id) {
        return servicoRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new RecursoNaoEncontradoException("Serviço com ID " + id + " não encontrado."));
    }

    public Servico criar(ServicoDTO dto) {
        // Validação: Impede a criação de serviços com nomes duplicados
        servicoRepository.findByNome(dto.nome()).ifPresent(s -> {
            throw new RegraDeNegocioException("Já existe um serviço com o nome: " + dto.nome());
        });

        Servico novoServico = new Servico();
        novoServico.setNome(dto.nome());
        novoServico.setDescricao(dto.descricao());
        novoServico.setPreco(dto.preco());
        novoServico.setDuracaoEstimadaMin(dto.duracaoEstimadaMin());

        return servicoRepository.save(novoServico);
    }

    public Servico atualizar(Integer id, ServicoDTO dto) {
        Servico servico = buscarPorId(id); // Reutiliza o método que já lança exceção se não encontrar

        servico.setNome(dto.nome());
        servico.setDescricao(dto.descricao());
        servico.setPreco(dto.preco());
        servico.setDuracaoEstimadaMin(dto.duracaoEstimadaMin());

        return servicoRepository.save(servico);
    }

    public void deletar(Integer id) {
        Servico servico = buscarPorId(id);

        // REGRA DE NEGÓCIO: Verifica se o serviço está sendo usado em algum agendamento
        if (agendamentoRepository.existsByServico(servico)) {
            throw new RegraDeNegocioException("Não é possível deletar este serviço, pois ele já está vinculado a agendamentos.");
        }

        servicoRepository.deleteById(Long.valueOf(id));
    }

    public void toggleStatus(Integer id) {
        Servico servico = buscarPorId(id); // Reutiliza o método que já temos
        servico.setAtivo(!servico.isAtivo()); // Inverte o status atual
        servicoRepository.save(servico);
    }
}

