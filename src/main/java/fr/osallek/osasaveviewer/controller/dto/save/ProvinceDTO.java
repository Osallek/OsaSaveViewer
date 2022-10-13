package fr.osallek.osasaveviewer.controller.dto.save;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;
import java.util.Map;


public class ProvinceDTO extends SimpleProvinceDTO {

    private Double baseTax;

    private Double baseProduction;

    private Double baseManpower;

    private Double devastation;

    private Double autonomy;

    private List<Double> institutions;

    private boolean isCity;

    private String node;

    private Map<String, Integer> improvements;

    private List<String> buildings;

    private Double colonySize;

    private List<ProvinceHistoryDTO> history;

    @JsonIgnore
    public String getCurrentOwner() {
        for (int i = this.history.size() - 1; i >= 0; i--) {
            if (this.history.get(i).getOwner() != null) {
                return this.history.get(i).getOwner();
            }
        }

        return null;
    }

    public Double getBaseTax() {
        return baseTax;
    }

    public void setBaseTax(Double baseTax) {
        this.baseTax = baseTax;
    }

    public Double getBaseProduction() {
        return baseProduction;
    }

    public void setBaseProduction(Double baseProduction) {
        this.baseProduction = baseProduction;
    }

    public Double getBaseManpower() {
        return baseManpower;
    }

    public void setBaseManpower(Double baseManpower) {
        this.baseManpower = baseManpower;
    }

    public Double getDevastation() {
        return devastation;
    }

    public void setDevastation(Double devastation) {
        this.devastation = devastation;
    }

    public Double getAutonomy() {
        return autonomy;
    }

    public void setAutonomy(Double autonomy) {
        this.autonomy = autonomy;
    }

    public List<Double> getInstitutions() {
        return institutions;
    }

    public void setInstitutions(List<Double> institutions) {
        this.institutions = institutions;
    }

    public boolean isCity() {
        return isCity;
    }

    public void setCity(boolean city) {
        isCity = city;
    }

    public String getNode() {
        return node;
    }

    public void setNode(String node) {
        this.node = node;
    }

    public Map<String, Integer> getImprovements() {
        return improvements;
    }

    public void setImprovements(Map<String, Integer> improvements) {
        this.improvements = improvements;
    }

    public List<String> getBuildings() {
        return buildings;
    }

    public void setBuildings(List<String> buildings) {
        this.buildings = buildings;
    }

    public Double getColonySize() {
        return colonySize;
    }

    public void setColonySize(Double colonySize) {
        this.colonySize = colonySize;
    }

    public List<ProvinceHistoryDTO> getHistory() {
        return history;
    }

    public void setHistory(List<ProvinceHistoryDTO> history) {
        this.history = history;
    }
}
