package fr.osallek.osasaveviewer.controller.dto.save;

public class TradeNodeIncomingDTO {

    private String from;

    private double value;

    private double added;

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public double getAdded() {
        return added;
    }

    public void setAdded(double added) {
        this.added = added;
    }
}
