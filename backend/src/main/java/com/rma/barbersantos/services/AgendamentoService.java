package com.rma.barbersantos.services;


import com.rma.barbersantos.model.*;
import com.rma.barbersantos.model.dto.AgendamentoDTO;
import com.rma.barbersantos.model.dto.AgendamentoResponseDTO;
import com.rma.barbersantos.model.dto.ProximoAgendamentoDTO;
import com.rma.barbersantos.repository.AgendamentoRepository;
import com.rma.barbersantos.repository.ServicoRepository;
import com.rma.barbersantos.repository.UsuarioRepository;
import com.rma.barbersantos.services.exceptions.RecursoNaoEncontradoException;
import com.rma.barbersantos.services.exceptions.RegraDeNegocioException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    private final UsuarioRepository usuarioRepository;
    private final ServicoRepository servicoRepository;

    public AgendamentoService(AgendamentoRepository agendamentoRepository, UsuarioRepository usuarioRepository, ServicoRepository servicoRepository) {
        this.agendamentoRepository = agendamentoRepository;
        this.usuarioRepository = usuarioRepository;
        this.servicoRepository = servicoRepository;
    }

    // MÉTODO CRIAR (JÁ ATUALIZADO)
    public Agendamento criar(AgendamentoDTO dto) {
        // ... (código que já ajustamos na Parte 1)
        Usuario cliente = usuarioRepository.findById(Long.valueOf(dto.idCliente()))
                .orElseThrow(() -> new RecursoNaoEncontradoException("Cliente com ID " + dto.idCliente() + " não encontrado."));
        Usuario barbeiro = usuarioRepository.findById(Long.valueOf(dto.idBarbeiro()))
                .orElseThrow(() -> new RecursoNaoEncontradoException("Barbeiro com ID " + dto.idBarbeiro() + " não encontrado."));
        Servico servico = servicoRepository.findById(Long.valueOf(dto.idServico()))
                .orElseThrow(() -> new RecursoNaoEncontradoException("Serviço com ID " + dto.idServico() + " não encontrado."));

        if (barbeiro.getNivelAcesso() != NivelAcesso.BARBEIRO) {
            throw new RegraDeNegocioException("O usuário selecionado não é um barbeiro.");
        }
        if (dto.dataHoraAgendamento().isBefore(LocalDateTime.now())) {
            throw new RegraDeNegocioException("Não é possível agendar um serviço em uma data passada.");
        }

        LocalDateTime horaInicio = dto.dataHoraAgendamento();
        LocalDateTime horaFim = horaInicio.plusMinutes(servico.getDuracaoEstimadaMin());
        List<Agendamento> conflitos = agendamentoRepository.findOverlappingAppointments(barbeiro, horaInicio, horaFim);
        if (!conflitos.isEmpty()) {
            throw new RegraDeNegocioException("Conflito de horário. O barbeiro já possui um agendamento que se sobrepõe a este período.");
        }

        Agendamento novoAgendamento = new Agendamento();
        novoAgendamento.setCliente(cliente);
        novoAgendamento.setBarbeiro(barbeiro);
        novoAgendamento.setServico(servico);
        novoAgendamento.setDataHoraAgendamento(dto.dataHoraAgendamento());
        novoAgendamento.setObservacoes(dto.observacoes());

        return agendamentoRepository.save(novoAgendamento);
    }

    // NOVO: Listar todos os agendamentos
    public List<AgendamentoResponseDTO> listarTodosParaAdmin() {
        return agendamentoRepository.findAll().stream()
                .map(AgendamentoResponseDTO::new)
                .toList();
    }

    // NOVO: Método específico para o cliente
    public List<AgendamentoResponseDTO> listarPorCliente() {
        Usuario clienteLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return agendamentoRepository.findByCliente(clienteLogado).stream()
                .map(AgendamentoResponseDTO::new)
                .toList();
    }

    // NOVO: Método específico para o barbeiro
    public List<AgendamentoResponseDTO> listarPorBarbeiro() {
        Usuario barbeiroLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return agendamentoRepository.findByBarbeiro(barbeiroLogado).stream()
                .map(AgendamentoResponseDTO::new)
                .toList();
    }

    // NOVO: Buscar um agendamento por ID
    public AgendamentoResponseDTO buscarPorId(Integer id) {
        Agendamento agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Agendamento com ID " + id + " não encontrado."));
        return new AgendamentoResponseDTO(agendamento);
    }

    // NOVO: Cancelar um agendamento (Soft Delete)
    public AgendamentoResponseDTO cancelar(Integer id, boolean canceladoPeloSalao) {
        Agendamento agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Agendamento com ID " + id + " não encontrado."));

        // ... lógica de cancelamento sem alterações ...
        if (agendamento.getStatus() == StatusAgendamento.CONCLUIDO || agendamento.getStatus().name().startsWith("CANCELADO")) {
            throw new RegraDeNegocioException("Este agendamento não pode ser cancelado, pois já foi concluído ou cancelado anteriormente.");
        }

        if (agendamento.getDataHoraAgendamento().isBefore(LocalDateTime.now())) {
            throw new RegraDeNegocioException("Não é possível cancelar um agendamento que já ocorreu.");
        }

        if (canceladoPeloSalao) {
            agendamento.setStatus(StatusAgendamento.CANCELADO_PELO_SALAO);
        } else {
            agendamento.setStatus(StatusAgendamento.CANCELADO_PELO_CLIENTE);
        }

        Agendamento agendamentoSalvo = agendamentoRepository.save(agendamento);
        return new AgendamentoResponseDTO(agendamentoSalvo);
    }

    public List<ProximoAgendamentoDTO> listarProximosDoBarbeiro() {
        // Pega o barbeiro logado
        Usuario barbeiroLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // Chama o novo método do repositório
        List<Agendamento> agendamentos = agendamentoRepository
                .findFirst3ByBarbeiroAndStatusAndDataHoraAgendamentoAfterOrderByDataHoraAgendamentoAsc(
                        barbeiroLogado, StatusAgendamento.AGENDADO, LocalDateTime.now());

        // Converte para o DTO enxuto e retorna
        return agendamentos.stream()
                .map(ProximoAgendamentoDTO::new)
                .toList();
    }

    public List<String> buscarHorariosDisponiveis(Integer barbeiroId, LocalDate data) {
        // Busca os agendamentos existentes para o barbeiro e data
        Usuario barbeiro = usuarioRepository.findById(Long.valueOf(barbeiroId))
                .orElseThrow(() -> new RecursoNaoEncontradoException("Barbeiro não encontrado"));

        LocalDateTime inicioDoDia = data.atStartOfDay();
        LocalDateTime fimDoDia = data.atTime(LocalTime.MAX);

        List<Agendamento> agendamentosDoDia = agendamentoRepository.findOverlappingAppointments(barbeiro, inicioDoDia, fimDoDia);

        // Extrai os horários já ocupados
        List<LocalTime> horariosOcupados = agendamentosDoDia.stream()
                .map(ag -> ag.getDataHoraAgendamento().toLocalTime())
                .collect(Collectors.toList());

        // Define os horários de funcionamento da barbearia (ex: 9h às 18h, de hora em hora)
        List<LocalTime> todosOsHorarios = new ArrayList<>();
        for (int i = 9; i <= 20; i++) {
            todosOsHorarios.add(LocalTime.of(i, 0));
        }

        // Filtra para retornar apenas os horários que NÃO estão na lista de ocupados
        return todosOsHorarios.stream()
                .filter(horario -> !horariosOcupados.contains(horario))
                .map(horario -> horario.toString()) // Converte para string (ex: "09:00")
                .collect(Collectors.toList());
    }
}