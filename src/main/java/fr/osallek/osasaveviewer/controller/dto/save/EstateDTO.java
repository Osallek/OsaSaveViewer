package fr.osallek.osasaveviewer.controller.dto.save;

import java.util.List;

public record EstateDTO(String type, double loyalty, double influence, double influenceFromTerritory, double territory, List<String> grantedPrivileges,
                        List<EstateModifierDTO> influenceModifiers, List<EstateModifierDTO> loyaltyModifiers, List<Integer> activeInfluences,
                        List<Integer> activeLoyalties) {
}
