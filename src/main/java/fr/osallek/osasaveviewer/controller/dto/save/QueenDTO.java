package fr.osallek.osasaveviewer.controller.dto.save;

public class QueenDTO extends MonarchDTO {

    private boolean consort;

    private boolean queenRegent;

    private String countryOfOrigin;

    public boolean isConsort() {
        return consort;
    }

    public void setConsort(boolean consort) {
        this.consort = consort;
    }

    public boolean isQueenRegent() {
        return queenRegent;
    }

    public void setQueenRegent(boolean queenRegent) {
        this.queenRegent = queenRegent;
    }

    public String getCountryOfOrigin() {
        return countryOfOrigin;
    }

    public void setCountryOfOrigin(String countryOfOrigin) {
        this.countryOfOrigin = countryOfOrigin;
    }
}
