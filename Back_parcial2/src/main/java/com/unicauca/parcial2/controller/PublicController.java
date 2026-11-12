package com.unicauca.parcial2.controller;

import com.unicauca.parcial2.dto.medico.MedicoResponse;
import com.unicauca.parcial2.service.IMedicoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicController {

    private final IMedicoService medicoService;

    /** PUBLICO: listar medicos (no requiere sesion). */
    @GetMapping("/medicos")
    public ResponseEntity<List<MedicoResponse>> listarMedicos() {
        return ResponseEntity.ok(medicoService.listar());
    }
}