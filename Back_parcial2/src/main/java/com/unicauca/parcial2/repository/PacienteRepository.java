package com.unicauca.parcial2.repository;

import com.unicauca.parcial2.model.entity.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    Optional<Paciente> findByCedula(String cedula);

    Optional<Paciente> findByUsuarioUsername(String username);

    boolean existsByCedula(String cedula);

    boolean existsByEmail(String email);

    List<Paciente> findAllByOrderByApellidosAsc();
}