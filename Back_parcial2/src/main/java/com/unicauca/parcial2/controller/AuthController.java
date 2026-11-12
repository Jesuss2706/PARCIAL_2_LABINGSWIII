package com.unicauca.parcial2.controller;

import com.unicauca.parcial2.dto.auth.LoginRequest;
import com.unicauca.parcial2.dto.auth.LoginResponse;
import com.unicauca.parcial2.dto.auth.UsuarioResponse;
import com.unicauca.parcial2.dto.comun.ExisteResponse;
import com.unicauca.parcial2.dto.paciente.PacienteRequest;
import com.unicauca.parcial2.dto.paciente.PacienteResponse;
import com.unicauca.parcial2.service.IPacienteService;
import com.unicauca.parcial2.service.IUsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final IUsuarioService usuarioService;
    private final IPacienteService pacienteService;

    /** PUBLICO: inicia sesion y devuelve el JWT. */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(usuarioService.login(request));
    }

    /** PUBLICO: un paciente crea su propia cuenta (siempre con rol PACIENTE). */
    @PostMapping("/registro")
    public ResponseEntity<PacienteResponse> registro(@Valid @RequestBody PacienteRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(pacienteService.registrar(request));
    }

    /** PUBLICO: validacion asincrona del formulario de registro. */
    @GetMapping("/existe/{cedula}")
    public ResponseEntity<ExisteResponse> existe(@PathVariable String cedula) {
        return ResponseEntity.ok(new ExisteResponse(pacienteService.existeCedula(cedula)));
    }

    /** PRIVADO (cualquier rol): datos del usuario dueño del token. */
    @GetMapping("/me")
    public ResponseEntity<UsuarioResponse> me(Authentication authentication) {
        return ResponseEntity.ok(usuarioService.obtenerPorUsername(authentication.getName()));
    }
}