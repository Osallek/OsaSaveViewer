package fr.osallek.osasaveviewer.controller.dto.save;

import java.time.LocalDate;

public class RelationDTO {

    private String first;

    private String second;

    private LocalDate date;

    public String getFirst() {
        return first;
    }

    public void setFirst(String first) {
        this.first = first;
    }

    public String getSecond() {
        return second;
    }

    public void setSecond(String second) {
        this.second = second;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
