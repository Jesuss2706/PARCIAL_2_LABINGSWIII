package com.unicauca.parcial2.dto.paciente;

import com.unicauca.parcial2.model.entity.Paciente;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PacienteResponse {
    private Long id;
    private String cedula;
    private String nombres;
    private String apellidos;
    private String nombreCompleto;
    private String email;
    private String telefono;
    private LocalDate fechaNacimiento;
    private String direccion;

    public static PacienteResponse fromEntity(Paciente p) {
        return PacienteResponse.builder()
                .id(p.getId())
                .cedula(p.getCedula())
                .nombres(p.getNombres())
                .apellidos(p.getApellidos())
                .nombreCompleto(p.getNombres() + " " + p.getApellidos())
                .email(p.getEmail())
                .telefono(p.getTelefono())
                .fechaNacimiento(p.getFechaNacimiento())
                .direccion(p.getDireccion())
                .build();
    }
}