package fr.osallek.osasaveviewer.controller.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Set;
import org.apache.commons.collections4.CollectionUtils;

public final class AssetsDTO {

    private boolean provinces;

    private boolean colors;

    private Set<String> countries;

    private Set<String> advisors;

    private Set<String> institutions;

    private Set<String> buildings;

    private Set<String> religions;

    private Set<String> tradeGoods;

    private Set<String> estates;

    private Set<String> privileges;

    public boolean isProvinces() {
        return provinces;
    }

    public void setProvinces(boolean provinces) {
        this.provinces = provinces;
    }

    public boolean isColors() {
        return colors;
    }

    public void setColors(boolean colors) {
        this.colors = colors;
    }

    public Set<String> getCountries() {
        return countries;
    }

    public void setCountries(Set<String> countries) {
        this.countries = countries;
    }

    public Set<String> getAdvisors() {
        return advisors;
    }

    public void setAdvisors(Set<String> advisors) {
        this.advisors = advisors;
    }

    public Set<String> getInstitutions() {
        return institutions;
    }

    public void setInstitutions(Set<String> institutions) {
        this.institutions = institutions;
    }

    public Set<String> getBuildings() {
        return buildings;
    }

    public void setBuildings(Set<String> buildings) {
        this.buildings = buildings;
    }

    public Set<String> getReligions() {
        return religions;
    }

    public void setReligions(Set<String> religions) {
        this.religions = religions;
    }

    public Set<String> getTradeGoods() {
        return tradeGoods;
    }

    public void setTradeGoods(Set<String> tradeGoods) {
        this.tradeGoods = tradeGoods;
    }

    public Set<String> getEstates() {
        return estates;
    }

    public void setEstates(Set<String> estates) {
        this.estates = estates;
    }

    public Set<String> getPrivileges() {
        return privileges;
    }

    public void setPrivileges(Set<String> privileges) {
        this.privileges = privileges;
    }
}