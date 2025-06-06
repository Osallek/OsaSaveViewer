package fr.osallek.osasaveviewer.controller.dto.save;

import java.util.Map;

public class Localised {

    protected Map<Eu4Language, String> localisations;

    public Localised() {
    }

    public Localised(Map<Eu4Language, String> localisations) {
        this.localisations = localisations;
    }

    public Localised(Localised other) {
        this.localisations = other.localisations;
    }

    public Map<Eu4Language, String> getLocalisations() {
        return localisations;
    }

    public void setLocalisations(Map<Eu4Language, String> localisations) {
        this.localisations = localisations;
    }
}
