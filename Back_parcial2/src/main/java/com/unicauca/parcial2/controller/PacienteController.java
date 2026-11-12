package com.unicauca.parcial2.controller;

import com.unicauca.parcial2.dto.comun.ExisteResponse;
import com.unicauca.parcial2.dto.paciente.PacienteRequest;
import com.unicauca.parcial2.dto.paciente.PacienteResponse;
import com.unicauca.parcial2.service.IPacienteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/pacientes")
@RequiredArgsConstructor
public class PacienteController {

    private final IPacienteService pacienteService;

    /** ADMIN: registrar paciente (tambien le crea su usuario). */
    @PostMapping
    public ResponseEntity<PacienteResponse> registrar(@Valid @RequestBody PacienteRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(pacienteService.registrar(request));
    }

    /** ADMIN: listar pacientes. */
    @GetMapping
    public ResponseEntity<List<PacienteResponse>> listar() {
        return ResponseEntity.ok(pacienteService.listar());
    }

    /** ADMIN: validacion asincrona del formulario reactivo. */
    @GetMapping("/existe/{cedula}")
    public ResponseEntity<ExisteResponse> existe(@PathVariable String cedula) {
        return ResponseEntity.ok(new ExisteResponse(pacienteService.existeCedula(cedula)));
    }
}