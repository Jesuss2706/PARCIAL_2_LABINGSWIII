package com.unicauca.parcial2.service;

import com.unicauca.parcial2.dto.cita.CitaRequest;
import com.unicauca.parcial2.dto.cita.CitaResponse;

import java.util.List;

public interface ICitaService {

    CitaResponse crear(CitaRequest request);

    List<CitaResponse> listarTodas();

    List<CitaResponse> listarPorPaciente(String username);
}