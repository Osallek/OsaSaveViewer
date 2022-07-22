package fr.osallek.osasaveviewer.controller.dto.save;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public class ProvinceHistoryDTO {

    private LocalDate date;

    private String capital;

    private List<String> addCores;

    private List<String> addClaims;

    private List<String> removeCores;

    private List<String> removeClaims;

    private Boolean hre;

    private Double baseTax;

    private Double baseProduction;

    private Double baseManpower;

    private String tradeGood;

    private String name;

    private String tribalOwner;

    private Integer advisor;

    private Integer nativeHostileness;

    private Integer nativeFerocity;

    private Integer nativeSize;

    private String owner;

    private String controller;

    private List<String> discoveredBy;

    private String culture;

    private String religion;

    private Boolean isCity;

    private Map<String, Boolean> buildings;

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getCapital() {
        return capital;
    }

    public void setCapital(String capital) {
        this.capital = capital;
    }

    public List<String> getAddCores() {
        return addCores;
    }

    public void setAddCores(List<String> addCores) {
        this.addCores = addCores;
    }

    public List<String> getAddClaims() {
        return addClaims;
    }

    public void setAddClaims(List<String> addClaims) {
        this.addClaims = addClaims;
    }

    public List<String> getRemoveCores() {
        return removeCores;
    }

    public void setRemoveCores(List<String> removeCores) {
        this.removeCores = removeCores;
    }

    public List<String> getRemoveClaims() {
        return removeClaims;
    }

    public void setRemoveClaims(List<String> removeClaims) {
        this.removeClaims = removeClaims;
    }

    public Boolean getHre() {
        return hre;
    }

    public void setHre(Boolean hre) {
        this.hre = hre;
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

    public String getTradeGood() {
        return tradeGood;
    }

    public void setTradeGood(String tradeGood) {
        this.tradeGood = tradeGood;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTribalOwner() {
        return tribalOwner;
    }

    public void setTribalOwner(String tribalOwner) {
        this.tribalOwner = tribalOwner;
    }

    public Integer getAdvisor() {
        return advisor;
    }

    public void setAdvisor(Integer advisor) {
        this.advisor = advisor;
    }

    public Integer getNativeHostileness() {
        return nativeHostileness;
    }

    public void setNativeHostileness(Integer nativeHostileness) {
        this.nativeHostileness = nativeHostileness;
    }

    public Integer getNativeFerocity() {
        return nativeFerocity;
    }

    public void setNativeFerocity(Integer nativeFerocity) {
        this.nativeFerocity = nativeFerocity;
    }

    public Integer getNativeSize() {
        return nativeSize;
    }

    public void setNativeSize(Integer nativeSize) {
        this.nativeSize = nativeSize;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getController() {
        return controller;
    }

    public void setController(String controller) {
        this.controller = controller;
    }

    public List<String> getDiscoveredBy() {
        return discoveredBy;
    }

    public void setDiscoveredBy(List<String> discoveredBy) {
        this.discoveredBy = discoveredBy;
    }

    public String getCulture() {
        return culture;
    }

    public void setCulture(String culture) {
        this.culture = culture;
    }

    public String getReligion() {
        return religion;
    }

    public void setReligion(String religion) {
        this.religion = religion;
    }

    public Boolean getCity() {
        return isCity;
    }

    public void setCity(Boolean city) {
        isCity = city;
    }

    public Map<String, Boolean> getBuildings() {
        return buildings;
    }

    public void setBuildings(Map<String, Boolean> buildings) {
        this.buildings = buildings;
    }
}
