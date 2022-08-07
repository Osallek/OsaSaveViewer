package fr.osallek.osasaveviewer.controller.dto.save;

import java.util.List;

public class MissionDTO extends NamedImageLocalisedDTO {

    private List<String> required;

    public List<String> getRequired() {
        return required;
    }

    public void setRequired(List<String> required) {
        this.required = required;
    }
}
