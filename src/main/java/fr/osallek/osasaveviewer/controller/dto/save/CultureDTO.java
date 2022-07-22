package fr.osallek.osasaveviewer.controller.dto.save;

public class CultureDTO extends Localised {

    private String group;

    private String name;

    private ColorDTO color;

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ColorDTO getColor() {
        return color;
    }

    public void setColor(ColorDTO color) {
        this.color = color;
    }
}
