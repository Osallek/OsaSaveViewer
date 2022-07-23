package fr.osallek.osasaveviewer.controller.dto.save;

import java.time.LocalDate;
import java.util.List;

public class MonarchDTO {

    private LocalDate monarchDate;

    private int id;

    private String country;

    private List<String> personalities;

    private String name;

    private int adm;

    private int dip;

    private int mil;

    private boolean female;

    private boolean regent;

    private String culture;

    private String religion;

    private String dynasty;

    private LocalDate birthDate;

    private LocalDate deathDate;

    private String monarchName;

    private LeaderDTO leader;

    private Integer duration;

    public LocalDate getMonarchDate() {
        return monarchDate;
    }

    public void setMonarchDate(LocalDate monarchDate) {
        this.monarchDate = monarchDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public List<String> getPersonalities() {
        return personalities;
    }

    public void setPersonalities(List<String> personalities) {
        this.personalities = personalities;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAdm() {
        return adm;
    }

    public void setAdm(int adm) {
        this.adm = adm;
    }

    public int getDip() {
        return dip;
    }

    public void setDip(int dip) {
        this.dip = dip;
    }

    public int getMil() {
        return mil;
    }

    public void setMil(int mil) {
        this.mil = mil;
    }

    public boolean isFemale() {
        return female;
    }

    public void setFemale(boolean female) {
        this.female = female;
    }

    public boolean isRegent() {
        return regent;
    }

    public void setRegent(boolean regent) {
        this.regent = regent;
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

    public String getDynasty() {
        return dynasty;
    }

    public void setDynasty(String dynasty) {
        this.dynasty = dynasty;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public LocalDate getDeathDate() {
        return deathDate;
    }

    public void setDeathDate(LocalDate deathDate) {
        this.deathDate = deathDate;
    }

    public String getMonarchName() {
        return monarchName;
    }

    public void setMonarchName(String monarchName) {
        this.monarchName = monarchName;
    }

    public LeaderDTO getLeader() {
        return leader;
    }

    public void setLeader(LeaderDTO leader) {
        this.leader = leader;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }
}
