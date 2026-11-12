package com.unicauca.parcial2.dto.paciente;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PacienteRequest {

    @NotBlank(message = "La cédula es obligatoria")
    @Pattern(regexp = "\\d{6,10}", message = "La cédula debe tener entre 6 y 10 dígitos")
    private String cedula;

    @NotBlank(message = "Los nombres son obligatorios")
    @Size(max = 60, message = "Máximo 60 caracteres")
    private String nombres;

    @NotBlank(message = "Los apellidos son obligatorios")
    @Size(max = 60, message = "Máximo 60 caracteres")
    private String apellidos;

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "El email no es válido")
    private String email;

    @NotBlank(message = "El teléfono es obligatorio")
    @Pattern(regexp = "\\d{7,10}", message = "El teléfono debe tener entre 7 y 10 dígitos")
    private String telefono;

    @NotNull(message = "La fecha de nacimiento es obligatoria")
    @Past(message = "La fecha de nacimiento debe ser en el pasado")
    private LocalDate fechaNacimiento;

    @Size(max = 150, message = "Máximo 150 caracteres")
    private String direccion;

    /** Contraseña con la que el paciente va a iniciar sesion. */
    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 6, message = "La contraseña debe tener mínimo 6 caracteres")
    private String password;
}