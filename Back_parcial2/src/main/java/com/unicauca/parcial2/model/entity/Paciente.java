package com.unicauca.parcial2.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "pacientes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 20)
    private String cedula;

    @Column(nullable = false, length = 60)
    private String nombres;

    @Column(nullable = false, length = 60)
    private String apellidos;

    @Column(nullable = false, unique = true, length = 120)
    private String email;

    @Column(nullable = false, length = 20)
    private String telefono;

    @Column(nullable = false)
    private LocalDate fechaNacimiento;

    @Column(length = 150)
    private String direccion;

    /** Usuario con el que el paciente inicia sesion (username = cedula). */
    @OneToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false, unique = true)
    private Usuario usuario;
}