package fr.osallek.osasaveviewer.controller.dto.save;

import java.util.List;

public class ProvinceListDTO extends NamedLocalisedDTO {

    private ColorDTO color;

    private List<Integer> provinces;

    public ColorDTO getColor() {
        return color;
    }

    public void setColor(ColorDTO color) {
        this.color = color;
    }

    public List<Integer> getProvinces() {
        return provinces;
    }

    public void setProvinces(List<Integer> provinces) {
        this.provinces = provinces;
    }

}
