package fr.osallek.osasaveviewer.controller.dto.save;

public class ImageLocalised extends Localised {

    protected String image;

    public ImageLocalised() {
    }

    public ImageLocalised(String image) {
        this.image = image;
    }

    public ImageLocalised(ImageLocalised other) {
        super(other);
        this.image = other.image;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
