package com.unicauca.parcial2.dto.auth;

import com.unicauca.parcial2.model.entity.Usuario;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioResponse {
    private Long id;
    private String username;
    private String nombre;
    private String rol;
    private boolean activo;

    public static UsuarioResponse fromEntity(Usuario u) {
        return UsuarioResponse.builder()
                .id(u.getId())
                .username(u.getUsername())
                .nombre(u.getNombre())
                .rol(u.getRol().name())
                .activo(u.isActivo())
                .build();
    }
}