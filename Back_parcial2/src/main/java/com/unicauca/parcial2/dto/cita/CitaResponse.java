package com.unicauca.parcial2.dto.cita;

import com.unicauca.parcial2.model.entity.Cita;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CitaResponse {
    private Long id;
    private LocalDateTime fechaHora;
    private String motivo;
    private String estado;

    private Long pacienteId;
    private String pacienteCedula;
    private String pacienteNombre;

    private Long medicoId;
    private String medicoNombre;
    private String especialidad;
    private String consultorio;

    public static CitaResponse fromEntity(Cita c) {
        return CitaResponse.builder()
                .id(c.getId())
                .fechaHora(c.getFechaHora())
                .motivo(c.getMotivo())
                .estado(c.getEstado().name())
                .pacienteId(c.getPaciente().getId())
                .pacienteCedula(c.getPaciente().getCedula())
                .pacienteNombre(c.getPaciente().getNombres() + " " + c.getPaciente().getApellidos())
                .medicoId(c.getMedico().getId())
                .medicoNombre("Dr(a). " + c.getMedico().getNombres() + " " + c.getMedico().getApellidos())
                .especialidad(c.getMedico().getEspecialidad())
                .consultorio(c.getMedico().getConsultorio())
                .build();
    }
}