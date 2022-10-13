package fr.osallek.osasaveviewer.controller.dto.save;

import java.util.List;

public class TradeNodeDTO extends NamedLocalisedDTO {

    private double retention;

    private ColorDTO color;

    private List<TradeNodeCountryDTO> countries;

    private List<TradeNodeIncomingDTO> incoming;

    public double getRetention() {
        return retention;
    }

    public void setRetention(double retention) {
        this.retention = retention;
    }

    public ColorDTO getColor() {
        return color;
    }

    public void setColor(ColorDTO color) {
        this.color = color;
    }

    public List<TradeNodeCountryDTO> getCountries() {
        return countries;
    }

    public void setCountries(List<TradeNodeCountryDTO> countries) {
        this.countries = countries;
    }

    public List<TradeNodeIncomingDTO> getIncoming() {
        return incoming;
    }

    public void setIncoming(List<TradeNodeIncomingDTO> incoming) {
        this.incoming = incoming;
    }
}
