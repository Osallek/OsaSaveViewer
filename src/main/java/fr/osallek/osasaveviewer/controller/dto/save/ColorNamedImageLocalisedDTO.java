package fr.osallek.osasaveviewer.controller.dto.save;

public class ColorNamedImageLocalisedDTO extends NamedImageLocalisedDTO {

    private ColorDTO color;

    public ColorDTO getColor() {
        return color;
    }

    public void setColor(ColorDTO color) {
        this.color = color;
    }
}
