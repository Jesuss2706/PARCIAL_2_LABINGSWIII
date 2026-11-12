package com.unicauca.parcial2.controller;

import com.unicauca.parcial2.dto.cita.CitaRequest;
import com.unicauca.parcial2.dto.cita.CitaResponse;
import com.unicauca.parcial2.service.ICitaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/citas")
@RequiredArgsConstructor
public class CitaController {

    private final ICitaService citaService;

    /** ADMIN: crear cita medica. */
    @PostMapping
    public ResponseEntity<CitaResponse> crear(@Valid @RequestBody CitaRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(citaService.crear(request));
    }

    /** ADMIN: listar las citas de todos los pacientes. */
    @GetMapping
    public ResponseEntity<List<CitaResponse>> listarTodas() {
        return ResponseEntity.ok(citaService.listarTodas());
    }
}