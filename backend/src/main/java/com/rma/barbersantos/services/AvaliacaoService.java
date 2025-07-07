package com.rma.barbersantos.services;

import com.rma.barbersantos.model.Agendamento;
import com.rma.barbersantos.model.Avaliacao;
import com.rma.barbersantos.model.StatusAgendamento;
import com.rma.barbersantos.model.Usuario;
import com.rma.barbersantos.repository.AgendamentoRepository;
import com.rma.barbersantos.repository.AvaliacaoRepository;
import com.rma.barbersantos.services.exceptions.RecursoNaoEncontradoException;
import com.rma.barbersantos.services.exceptions.RegraDeNegocioException;
import org.springframework.stereotype.Service;

@Service
public class AvaliacaoService {

    private final AvaliacaoRepository avaliacaoRepository;
    private final AgendamentoRepository agendamentoRepository;

    public AvaliacaoService(AvaliacaoRepository avaliacaoRepository, AgendamentoRepository agendamentoRepository) {
        this.avaliacaoRepository = avaliacaoRepository;
        this.agendamentoRepository = agendamentoRepository;
    }

    public Avaliacao criar(Integer idAgendamento, Byte nota, String comentario, Usuario clienteLogado) {
        Agendamento agendamento = agendamentoRepository.findById(idAgendamento)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Agendamento não encontrado."));

        // Regras de negócio
        if (!agendamento.getCliente().getId().equals(clienteLogado.getId())) {
            throw new RegraDeNegocioException("Você só pode avaliar seus próprios agendamentos.");
        }
        if (agendamento.getStatus() != StatusAgendamento.CONCLUIDO) {
            throw new RegraDeNegocioException("Só é possível avaliar agendamentos concluídos.");
        }
        if (agendamento.getAvaliacao() != null) {
            throw new RegraDeNegocioException("Este agendamento já foi avaliado.");
        }

        Avaliacao novaAvaliacao = new Avaliacao(null, agendamento, nota, comentario, null);
        return avaliacaoRepository.save(novaAvaliacao);
    }
}
