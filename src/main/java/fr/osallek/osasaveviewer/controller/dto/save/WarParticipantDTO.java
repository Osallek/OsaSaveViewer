package fr.osallek.osasaveviewer.controller.dto.save;

import java.util.Map;

public record WarParticipantDTO(Double value, String tag, boolean promisedLand, Map<Losses, Integer> losses) {
}
