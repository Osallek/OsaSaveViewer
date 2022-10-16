package fr.osallek.osasaveviewer.controller.dto.save;

import java.time.LocalDate;

public class DependencyDTO extends RelationDTO {

    private String type;

    private LocalDate endDate;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}
