package fr.osallek.osasaveviewer.controller.dto.save;

public record CombatantDTO(Integer cavalry, Integer artillery, Integer infantry, Integer galley, Integer lightShip, Integer heavyShip, Integer transport,
                           Integer losses, String country, String commander) {
}
