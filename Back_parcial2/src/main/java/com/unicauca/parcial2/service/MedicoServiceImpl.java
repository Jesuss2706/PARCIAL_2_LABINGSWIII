package com.unicauca.parcial2.service;

import com.unicauca.parcial2.dto.medico.MedicoRequest;
import com.unicauca.parcial2.dto.medico.MedicoResponse;
import com.unicauca.parcial2.exception.RecursoDuplicadoException;
import com.unicauca.parcial2.exception.RecursoNoEncontradoException;
import com.unicauca.parcial2.model.entity.Medico;
import com.unicauca.parcial2.repository.MedicoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicoServiceImpl implements IMedicoService {

    private final MedicoRepository medicoRepository;

    @Override
    @Transactional
    public MedicoResponse registrar(MedicoRequest request) {
        String cedula = request.getCedula().trim();
        String email = request.getEmail().trim().toLowerCase();

        if (medicoRepository.existsByCedula(cedula)) {
            throw new RecursoDuplicadoException("Ya existe un médico con la cédula " + cedula);
        }
        if (medicoRepository.existsByEmail(email)) {
            throw new RecursoDuplicadoException("Ya existe un médico con el email " + email);
        }

        Medico medico = Medico.builder()
                .cedula(cedula)
                .nombres(request.getNombres().trim())
                .apellidos(request.getApellidos().trim())
                .especialidad(request.getEspecialidad().trim())
                .email(email)
                .telefono(request.getTelefono().trim())
                .consultorio(request.getConsultorio())
                .activo(true)
                .build();

        return MedicoResponse.fromEntity(medicoRepository.save(medico));
    }

    @Override
    @Transactional(readOnly = true)
    public List<MedicoResponse> listar() {
        return medicoRepository.findAllByOrderByApellidosAsc()
                .stream()
                .map(MedicoResponse::fromEntity)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existeCedula(String cedula) {
        return medicoRepository.existsByCedula(cedula.trim());
    }

    @Override
    @Transactional(readOnly = true)
    public Medico obtenerEntidadPorId(Long id) {
        return medicoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("No existe el médico con id " + id));
    }
}