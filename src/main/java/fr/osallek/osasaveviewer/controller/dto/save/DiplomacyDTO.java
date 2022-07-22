package fr.osallek.osasaveviewer.controller.dto.save;

import java.util.List;

public record DiplomacyDTO(List<DependencyDTO> dependencies, List<RelationDTO> alliances) {
}
