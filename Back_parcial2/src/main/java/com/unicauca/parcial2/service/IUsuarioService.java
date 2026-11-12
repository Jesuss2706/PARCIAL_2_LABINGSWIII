package com.unicauca.parcial2.service;

import com.unicauca.parcial2.dto.auth.LoginRequest;
import com.unicauca.parcial2.dto.auth.LoginResponse;
import com.unicauca.parcial2.dto.auth.UsuarioResponse;
import com.unicauca.parcial2.model.entity.Usuario;
import com.unicauca.parcial2.model.enums.Rol;

public interface IUsuarioService {

    LoginResponse login(LoginRequest request);

    UsuarioResponse obtenerPorUsername(String username);

    Usuario crearUsuario(String username, String password, String nombre, Rol rol);

    boolean existeUsername(String username);
}