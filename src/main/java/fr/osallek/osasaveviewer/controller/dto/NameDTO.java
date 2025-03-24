package fr.osallek.osasaveviewer.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class NameDTO {

    @JsonProperty("name")
    private String name;

    public NameDTO() {
    }

    public NameDTO(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
