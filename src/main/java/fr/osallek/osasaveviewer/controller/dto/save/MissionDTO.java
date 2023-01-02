package fr.osallek.osasaveviewer.controller.dto.save;

import java.util.List;

public class MissionDTO extends NamedImageLocalisedDTO {

    private List<String> required;

    private boolean completed;

    private Localised description;

    public List<String> getRequired() {
        return required;
    }

    public void setRequired(List<String> required) {
        this.required = required;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public Localised getDescription() {
        return description;
    }

    public void setDescription(Localised description) {
        this.description = description;
    }
}
