package fr.osallek.osasaveviewer.controller.dto.save;

import java.time.LocalDate;

public record BattleDTO(LocalDate date, String name, Integer location, boolean result, CombatantDTO attacker, CombatantDTO defender) {
}
