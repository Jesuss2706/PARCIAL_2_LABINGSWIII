package com.unicauca.parcial2.controller;

import com.unicauca.parcial2.dto.cita.CitaResponse;
import com.unicauca.parcial2.service.ICitaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/paciente")
@RequiredArgsConstructor
public class PacienteCitaController {

    private final ICitaService citaService;

    /** PACIENTE: listar SUS citas medicas. */
    @GetMapping("/citas")
    public ResponseEntity<List<CitaResponse>> misCitas(Authentication authentication) {
        return ResponseEntity.ok(citaService.listarPorPaciente(authentication.getName()));
    }
}