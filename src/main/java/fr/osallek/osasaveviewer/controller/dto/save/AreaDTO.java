package fr.osallek.osasaveviewer.controller.dto.save;

import java.util.List;
import java.util.Map;
import java.util.Objects;

public class AreaDTO extends NamedLocalisedDTO {

    private ColorDTO color;

    private List<Integer> provinces;

    private Map<String, List<String>> investments;

    private Map<String, CountryStateDTO> states;

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

    public Map<String, List<String>> getInvestments() {
        return investments;
    }

    public void setInvestments(Map<String, List<String>> investments) {
        this.investments = investments;
    }

    public Map<String, CountryStateDTO> getStates() {
        return states;
    }

    public void setStates(Map<String, CountryStateDTO> states) {
        this.states = states;
    }
}
