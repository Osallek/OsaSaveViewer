package fr.osallek.osasaveviewer.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record ServerSaveDTO(@JsonProperty("name") String name, @JsonProperty("creationDate") LocalDateTime creationDate, @JsonProperty("date") LocalDate date,
                            @JsonProperty("id") String id) {
}
