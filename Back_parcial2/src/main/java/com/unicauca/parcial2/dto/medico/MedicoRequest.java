package com.unicauca.parcial2.dto.medico;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicoRequest {

    @NotBlank(message = "La cédula es obligatoria")
    @Pattern(regexp = "\\d{6,10}", message = "La cédula debe tener entre 6 y 10 dígitos")
    private String cedula;

    @NotBlank(message = "Los nombres son obligatorios")
    @Size(max = 60, message = "Máximo 60 caracteres")
    private String nombres;

    @NotBlank(message = "Los apellidos son obligatorios")
    @Size(max = 60, message = "Máximo 60 caracteres")
    private String apellidos;

    @NotBlank(message = "La especialidad es obligatoria")
    @Size(max = 80, message = "Máximo 80 caracteres")
    private String especialidad;

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "El email no es válido")
    private String email;

    @NotBlank(message = "El teléfono es obligatorio")
    @Pattern(regexp = "\\d{7,10}", message = "El teléfono debe tener entre 7 y 10 dígitos")
    private String telefono;

    @Size(max = 20, message = "Máximo 20 caracteres")
    private String consultorio;
}