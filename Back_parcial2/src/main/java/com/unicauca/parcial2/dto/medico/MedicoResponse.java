package com.unicauca.parcial2.dto.medico;

import com.unicauca.parcial2.model.entity.Medico;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicoResponse {
    private Long id;
    private String cedula;
    private String nombres;
    private String apellidos;
    private String nombreCompleto;
    private String especialidad;
    private String email;
    private String telefono;
    private String consultorio;
    private boolean activo;

    public static MedicoResponse fromEntity(Medico m) {
        return MedicoResponse.builder()
                .id(m.getId())
                .cedula(m.getCedula())
                .nombres(m.getNombres())
                .apellidos(m.getApellidos())
                .nombreCompleto("Dr(a). " + m.getNombres() + " " + m.getApellidos())
                .especialidad(m.getEspecialidad())
                .email(m.getEmail())
                .telefono(m.getTelefono())
                .consultorio(m.getConsultorio())
                .activo(m.isActivo())
                .build();
    }
}