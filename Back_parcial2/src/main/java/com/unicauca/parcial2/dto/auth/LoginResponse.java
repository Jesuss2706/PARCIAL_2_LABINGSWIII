package com.unicauca.parcial2.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {
    private String token;
    @Builder.Default
    private String tipo = "Bearer";
    private Long expiraEn;
    private String username;
    private String nombre;
    private String rol;
}