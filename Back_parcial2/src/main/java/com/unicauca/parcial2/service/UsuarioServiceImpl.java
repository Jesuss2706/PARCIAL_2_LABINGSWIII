package com.unicauca.parcial2.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.unicauca.parcial2.dto.auth.LoginRequest;
import com.unicauca.parcial2.dto.auth.LoginResponse;
import com.unicauca.parcial2.dto.auth.UsuarioResponse;
import com.unicauca.parcial2.exception.RecursoDuplicadoException;
import com.unicauca.parcial2.exception.RecursoNoEncontradoException;
import com.unicauca.parcial2.model.entity.Usuario;
import com.unicauca.parcial2.model.enums.Rol;
import com.unicauca.parcial2.repository.UsuarioRepository;
import com.unicauca.parcial2.security.JwtUtil;

@Service
@RequiredArgsConstructor 
public class UsuarioServiceImpl implements IUsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Override
    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {
        // Si las credenciales son incorrectas lanza BadCredentialsException -> 401
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        Usuario usuario = usuarioRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RecursoNoEncontradoException("Usuario no encontrado"));

        String token = jwtUtil.generarToken(usuario.getUsername(), usuario.getRol().name());

        return LoginResponse.builder()
                .token(token)
                .expiraEn(jwtUtil.getExpiration())
                .username(usuario.getUsername())
                .nombre(usuario.getNombre())
                .rol(usuario.getRol().name())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public UsuarioResponse obtenerPorUsername(String username) {
        return usuarioRepository.findByUsername(username)
                .map(UsuarioResponse::fromEntity)
                .orElseThrow(() -> new RecursoNoEncontradoException("Usuario no encontrado: " + username));
    }

    @Override
    @Transactional
    public Usuario crearUsuario(String username, String password, String nombre, Rol rol) {
        if (usuarioRepository.existsByUsername(username)) {
            throw new RecursoDuplicadoException("Ya existe un usuario con username " + username);
        }
        Usuario usuario = Usuario.builder()
                .username(username)
                .password(passwordEncoder.encode(password))
                .nombre(nombre)
                .rol(rol)
                .activo(true)
                .build();
        return usuarioRepository.save(usuario);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existeUsername(String username) {
        return usuarioRepository.existsByUsername(username);
    }
}