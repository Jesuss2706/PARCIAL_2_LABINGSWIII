package com.unicauca.parcial2.service;

import com.unicauca.parcial2.dto.medico.MedicoRequest;
import com.unicauca.parcial2.dto.medico.MedicoResponse;
import com.unicauca.parcial2.model.entity.Medico;

import java.util.List;

public interface IMedicoService {

    MedicoResponse registrar(MedicoRequest request);

    List<MedicoResponse> listar();

    boolean existeCedula(String cedula);

    /** Lo usa CitaService al crear una cita. */
    Medico obtenerEntidadPorId(Long id);
}