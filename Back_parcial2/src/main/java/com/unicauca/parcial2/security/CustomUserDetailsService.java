package com.unicauca.parcial2.security;

import com.unicauca.parcial2.model.entity.Usuario;
import com.unicauca.parcial2.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsPasswordService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService, UserDetailsPasswordService {

    private final UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));
        return toUserDetails(usuario);
    }

    @Override
    @Transactional
    public UserDetails updatePassword(UserDetails user, String newEncodedPassword) {
        Usuario usuario = usuarioRepository.findByUsername(user.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + user.getUsername()));
        usuario.setPassword(newEncodedPassword);
        usuarioRepository.save(usuario);
        return toUserDetails(usuario);
    }

    private UserDetails toUserDetails(Usuario usuario) {
        return User.builder()
                .username(usuario.getUsername())
                .password(usuario.getPassword())
                .authorities(List.of(new SimpleGrantedAuthority("ROLE_" + usuario.getRol().name())))
                .disabled(!usuario.isActivo())
                .build();
    }
}