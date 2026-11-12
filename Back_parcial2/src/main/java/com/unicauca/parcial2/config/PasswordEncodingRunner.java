package com.unicauca.parcial2.config;

import com.unicauca.parcial2.model.entity.Usuario;
import com.unicauca.parcial2.repository.UsuarioRepository;
import com.unicauca.parcial2.security.FlexiblePasswordEncoder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class PasswordEncodingRunner implements ApplicationRunner {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        List<Usuario> sinCodificar = usuarioRepository.findAll().stream()
                .filter(u -> !FlexiblePasswordEncoder.isEncoded(u.getPassword()))
                .toList();

        sinCodificar.forEach(u -> u.setPassword(passwordEncoder.encode(u.getPassword())));
        usuarioRepository.saveAll(sinCodificar);

        if (!sinCodificar.isEmpty()) {
            log.info(">> {} contraseña(s) en texto plano fueron codificadas con BCrypt", sinCodificar.size());
        }
    }
}