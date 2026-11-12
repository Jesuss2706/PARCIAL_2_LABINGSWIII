package com.unicauca.parcial2.repository;

import com.unicauca.parcial2.model.entity.Cita;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Long> {

    @EntityGraph(attributePaths = {"paciente", "medico"})
    List<Cita> findAllByOrderByFechaHoraDesc();

    @EntityGraph(attributePaths = {"paciente", "medico"})
    List<Cita> findByPacienteUsuarioUsernameOrderByFechaHoraDesc(String username);

    boolean existsByMedicoIdAndFechaHora(Long medicoId, LocalDateTime fechaHora);

    boolean existsByPacienteIdAndFechaHora(Long pacienteId, LocalDateTime fechaHora);
}