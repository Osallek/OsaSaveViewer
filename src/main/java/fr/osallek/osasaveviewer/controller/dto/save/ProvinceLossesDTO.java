package fr.osallek.osasaveviewer.controller.dto.save;

import java.time.LocalDate;

public class ProvinceLossesDTO {

    private LocalDate date;

    private Long losses;

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Long getLosses() {
        return losses;
    }

    public void setLosses(Long losses) {
        this.losses = losses;
    }
}
