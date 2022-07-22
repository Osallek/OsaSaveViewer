package fr.osallek.osasaveviewer.controller.dto.save;

import java.time.LocalDate;

public record LeaderDTO(int id, String name, LeaderType type, boolean female, int manuever, int fire, int shock, int siege, String personality,
                        LocalDate activation, LocalDate deathDate) {
}
