package fr.osallek.osasaveviewer.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import fr.osallek.osasaveviewer.controller.dto.save.Localised;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;

public record ServerSaveDTO(@JsonProperty("name") String name, @JsonProperty("creationDate") LocalDateTime creationDate, @JsonProperty("date") LocalDate date,
                            @JsonProperty("id") String id, @JsonProperty("hideAll") boolean hideAll, @JsonProperty("country") String country,
                            @JsonProperty("countryName") Localised countryName, @JsonProperty("flag") String flag, @JsonProperty("version") String version,
                            @JsonProperty("nbPlayers") long nbPlayers, @JsonProperty("ownerId") String ownerId, @JsonProperty("ownerName") String ownerName,
                            @JsonProperty("ownerImage") String ownerImage) implements Comparable<ServerSaveDTO> {

    @Override
    public int compareTo(ServerSaveDTO o) {
        return Comparator.comparing(ServerSaveDTO::creationDate).reversed().compare(this, o);
    }
}
