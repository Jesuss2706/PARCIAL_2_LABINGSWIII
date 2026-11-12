package com.unicauca.parcial2.dto.cita;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CitaRequest {

    @NotNull(message = "El paciente es obligatorio")
    private Long pacienteId;

    @NotNull(message = "El médico es obligatorio")
    private Long medicoId;

    @NotNull(message = "La fecha y hora son obligatorias")
    @Future(message = "La cita debe ser en una fecha futura")
    private LocalDateTime fechaHora;

    @NotBlank(message = "El motivo es obligatorio")
    @Size(max = 255, message = "Máximo 255 caracteres")
    private String motivo;
}