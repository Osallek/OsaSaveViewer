package fr.osallek.osasaveviewer.controller.dto.save;

import java.time.LocalDate;

public record AdvisorDTO(int id, String name, String type, LocalDate birth, LocalDate hire, LocalDate death, int skill, int location, boolean female,
                         String culture, String religion) {
}
