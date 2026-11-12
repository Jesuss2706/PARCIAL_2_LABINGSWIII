package com.unicauca.parcial2.controller;

import com.unicauca.parcial2.dto.comun.ExisteResponse;
import com.unicauca.parcial2.dto.medico.MedicoRequest;
import com.unicauca.parcial2.dto.medico.MedicoResponse;
import com.unicauca.parcial2.service.IMedicoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/medicos")
@RequiredArgsConstructor
public class MedicoController {

    private final IMedicoService medicoService;

    /** ADMIN: registrar medico. */
    @PostMapping
    public ResponseEntity<MedicoResponse> registrar(@Valid @RequestBody MedicoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(medicoService.registrar(request));
    }

    /** ADMIN: listar medicos. */
    @GetMapping
    public ResponseEntity<List<MedicoResponse>> listar() {
        return ResponseEntity.ok(medicoService.listar());
    }

    /** ADMIN: validacion asincrona del formulario reactivo. */
    @GetMapping("/existe/{cedula}")
    public ResponseEntity<ExisteResponse> existe(@PathVariable String cedula) {
        return ResponseEntity.ok(new ExisteResponse(medicoService.existeCedula(cedula)));
    }
}