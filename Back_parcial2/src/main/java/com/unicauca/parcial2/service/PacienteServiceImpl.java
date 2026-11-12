package com.unicauca.parcial2.service;

import com.unicauca.parcial2.dto.paciente.PacienteRequest;
import com.unicauca.parcial2.dto.paciente.PacienteResponse;
import com.unicauca.parcial2.exception.RecursoDuplicadoException;
import com.unicauca.parcial2.exception.RecursoNoEncontradoException;
import com.unicauca.parcial2.model.entity.Paciente;
import com.unicauca.parcial2.model.entity.Usuario;
import com.unicauca.parcial2.model.enums.Rol;
import com.unicauca.parcial2.repository.PacienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PacienteServiceImpl implements IPacienteService {

    private final PacienteRepository pacienteRepository;
    private final IUsuarioService usuarioService;

    @Override
    @Transactional
    public PacienteResponse registrar(PacienteRequest request) {
        String cedula = request.getCedula().trim();
        String email = request.getEmail().trim().toLowerCase();

        if (existeCedula(cedula)) {
            throw new RecursoDuplicadoException("Ya existe un paciente con la cédula " + cedula);
        }
        if (pacienteRepository.existsByEmail(email)) {
            throw new RecursoDuplicadoException("Ya existe un paciente con el email " + email);
        }

        // 1. Crear el usuario para el login (username = cedula, rol PACIENTE)
        String nombreCompleto = request.getNombres().trim() + " " + request.getApellidos().trim();
        Usuario usuario = usuarioService.crearUsuario(cedula, request.getPassword(), nombreCompleto, Rol.PACIENTE);

        // 2. Crear el paciente ligado a ese usuario
        Paciente paciente = Paciente.builder()
                .cedula(cedula)
                .nombres(request.getNombres().trim())
                .apellidos(request.getApellidos().trim())
                .email(email)
                .telefono(request.getTelefono().trim())
                .fechaNacimiento(request.getFechaNacimiento())
                .direccion(request.getDireccion())
                .usuario(usuario)
                .build();

        return PacienteResponse.fromEntity(pacienteRepository.save(paciente));
    }

    @Override
    @Transactional(readOnly = true)
    public List<PacienteResponse> listar() {
        return pacienteRepository.findAllByOrderByApellidosAsc()
                .stream()
                .map(PacienteResponse::fromEntity)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existeCedula(String cedula) {
        String c = cedula.trim();
        return pacienteRepository.existsByCedula(c) || usuarioService.existeUsername(c);
    }

    @Override
    @Transactional(readOnly = true)
    public Paciente obtenerEntidadPorId(Long id) {
        return pacienteRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("No existe el paciente con id " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public Paciente obtenerEntidadPorUsername(String username) {
        return pacienteRepository.findByUsuarioUsername(username)
                .orElseThrow(() -> new RecursoNoEncontradoException("No hay un paciente asociado al usuario " + username));
    }
}