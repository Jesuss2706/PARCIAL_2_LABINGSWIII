package com.unicauca.parcial2.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.unicauca.parcial2.dto.auth.LoginRequest;
import com.unicauca.parcial2.dto.auth.LoginResponse;
import com.unicauca.parcial2.dto.auth.UsuarioResponse;
import com.unicauca.parcial2.service.IUsuarioService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final IUsuarioService usuarioService;

    /** PUBLICO */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(usuarioService.login(request));
    }

    /** PRIVADO (cualquier rol) */
    @GetMapping("/me")
    public ResponseEntity<UsuarioResponse> me(Authentication authentication) {
        return ResponseEntity.ok(usuarioService.obtenerPorUsername(authentication.getName()));
    }
}