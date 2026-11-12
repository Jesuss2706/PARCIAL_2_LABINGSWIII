package com.unicauca.parcial2.service;

import com.unicauca.parcial2.dto.cita.CitaRequest;
import com.unicauca.parcial2.dto.cita.CitaResponse;
import com.unicauca.parcial2.exception.RecursoDuplicadoException;
import com.unicauca.parcial2.model.entity.Cita;
import com.unicauca.parcial2.model.entity.Medico;
import com.unicauca.parcial2.model.entity.Paciente;
import com.unicauca.parcial2.model.enums.EstadoCita;
import com.unicauca.parcial2.repository.CitaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CitaServiceImpl implements ICitaService {

    private final CitaRepository citaRepository;
    private final IPacienteService pacienteService;
    private final IMedicoService medicoService;

    @Override
    @Transactional
    public CitaResponse crear(CitaRequest request) {
        Paciente paciente = pacienteService.obtenerEntidadPorId(request.getPacienteId()); // 404 si no existe
        Medico medico = medicoService.obtenerEntidadPorId(request.getMedicoId());        // 404 si no existe

        // se ignoran segundos para comparar horarios
        LocalDateTime fechaHora = request.getFechaHora().withSecond(0).withNano(0);

        if (citaRepository.existsByMedicoIdAndFechaHora(medico.getId(), fechaHora)) {
            throw new RecursoDuplicadoException("El médico ya tiene una cita en esa fecha y hora");
        }
        if (citaRepository.existsByPacienteIdAndFechaHora(paciente.getId(), fechaHora)) {
            throw new RecursoDuplicadoException("El paciente ya tiene una cita en esa fecha y hora");
        }

        Cita cita = Cita.builder()
                .fechaHora(fechaHora)
                .motivo(request.getMotivo().trim())
                .estado(EstadoCita.PROGRAMADA)
                .paciente(paciente)
                .medico(medico)
                .build();

        return CitaResponse.fromEntity(citaRepository.save(cita));
    }

    @Override
    @Transactional(readOnly = true)
    public List<CitaResponse> listarTodas() {
        return citaRepository.findAllByOrderByFechaHoraDesc()
                .stream()
                .map(CitaResponse::fromEntity)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<CitaResponse> listarPorPaciente(String username) {
        return citaRepository.findByPacienteUsuarioUsernameOrderByFechaHoraDesc(username)
                .stream()
                .map(CitaResponse::fromEntity)
                .toList();
    }
}