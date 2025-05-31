package fr.osallek.osasaveviewer.controller.dto.save;

import java.util.List;

public class SuperRegionDTO extends NamedLocalisedDTO {

    private ColorDTO color;

    private List<String> regions;

    public ColorDTO getColor() {
        return color;
    }

    public void setColor(ColorDTO color) {
        this.color = color;
    }

    public List<String> getRegions() {
        return regions;
    }

    public void setRegions(List<String> regions) {
        this.regions = regions;
    }
}
