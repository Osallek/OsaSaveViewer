package fr.osallek.osasaveviewer.controller.dto.save;

import java.time.LocalDate;
import java.util.List;

public record WarHistoryEventDTO(LocalDate date, List<String> addAttacker, List<String> addDefender, List<String> remAttacker, List<String> remDefender,
                                 List<BattleDTO> battles) {
}
