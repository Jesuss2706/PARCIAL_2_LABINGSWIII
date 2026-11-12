package com.unicauca.parcial2.repository;

import com.unicauca.parcial2.model.entity.Medico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicoRepository extends JpaRepository<Medico, Long> {

    boolean existsByCedula(String cedula);

    boolean existsByEmail(String email);

    List<Medico> findAllByOrderByApellidosAsc();
}