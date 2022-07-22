package fr.osallek.osasaveviewer.controller.dto.save;

import java.time.LocalDate;

public class ReligionDTO extends NamedImageLocalisedDTO {

    private String group;

    private ColorDTO color;

    private Integer icon;

    private boolean hreReligion;

    private boolean hreHereticReligion;

    private LocalDate enable;

    private int nbProvinces;

    private String defender;

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public ColorDTO getColor() {
        return color;
    }

    public void setColor(ColorDTO color) {
        this.color = color;
    }

    public Integer getIcon() {
        return icon;
    }

    public void setIcon(Integer icon) {
        this.icon = icon;
    }

    public boolean isHreReligion() {
        return hreReligion;
    }

    public void setHreReligion(boolean hreReligion) {
        this.hreReligion = hreReligion;
    }

    public boolean isHreHereticReligion() {
        return hreHereticReligion;
    }

    public void setHreHereticReligion(boolean hreHereticReligion) {
        this.hreHereticReligion = hreHereticReligion;
    }

    public LocalDate getEnable() {
        return enable;
    }

    public void setEnable(LocalDate enable) {
        this.enable = enable;
    }

    public int getNbProvinces() {
        return nbProvinces;
    }

    public void setNbProvinces(int nbProvinces) {
        this.nbProvinces = nbProvinces;
    }

    public String getDefender() {
        return defender;
    }

    public void setDefender(String defender) {
        this.defender = defender;
    }
}
