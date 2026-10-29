package com.unicauca.parcial2.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;

@Data
public class PatientDTO {
    @NotNull
    private Long idPatient;
    @NotBlank
    private String namePatient;
    @NotBlank
    private String lastNamePatient;
    private String emailPatient;
    private LocalDate dateBirthPatient;
    @NotBlank
    private String genderPatient;
}