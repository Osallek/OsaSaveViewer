package fr.osallek.osasaveviewer.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;

public record ServerSaveDTO(@JsonProperty("name") String name, @JsonProperty("creationDate") LocalDateTime creationDate, @JsonProperty("date") LocalDate date,
                            @JsonProperty("id") String id, @JsonProperty("country") String country, @JsonProperty("countryName") String countryName,
                            @JsonProperty("flag") String flag, @JsonProperty("version") String version, @JsonProperty("nbPlayers") long nbPlayers,
                            @JsonProperty("ownerId") String ownerId, @JsonProperty("ownerName") String ownerName,
                            @JsonProperty("ownerImage") String ownerImage) implements Comparable<ServerSaveDTO> {

    @Override
    public int compareTo(ServerSaveDTO o) {
        return Comparator.comparing(ServerSaveDTO::creationDate).reversed().compare(this, o);
    }
}
