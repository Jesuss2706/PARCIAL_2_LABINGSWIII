package com.unicauca.parcial2.service;

import com.unicauca.parcial2.dto.paciente.PacienteRequest;
import com.unicauca.parcial2.dto.paciente.PacienteResponse;
import com.unicauca.parcial2.model.entity.Paciente;

import java.util.List;

public interface IPacienteService {

    PacienteResponse registrar(PacienteRequest request);

    List<PacienteResponse> listar();

    /** true si ya hay un paciente o un usuario con esa cedula. */
    boolean existeCedula(String cedula);

    /** Lo usa CitaService para "mis citas" y para crear citas. */
    Paciente obtenerEntidadPorId(Long id);

    Paciente obtenerEntidadPorUsername(String username);
}