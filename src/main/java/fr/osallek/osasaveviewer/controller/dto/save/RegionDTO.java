package fr.osallek.osasaveviewer.controller.dto.save;

import java.util.List;

public class RegionDTO extends NamedLocalisedDTO {

    private ColorDTO color;

    private List<String> areas;

    public ColorDTO getColor() {
        return color;
    }

    public void setColor(ColorDTO color) {
        this.color = color;
    }

    public List<String> getAreas() {
        return areas;
    }

    public void setAreas(List<String> areas) {
        this.areas = areas;
    }
}
