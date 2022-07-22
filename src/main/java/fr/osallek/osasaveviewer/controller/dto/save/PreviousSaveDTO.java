package fr.osallek.osasaveviewer.controller.dto.save;

import java.time.LocalDate;
import java.util.Comparator;

public record PreviousSaveDTO(String id, LocalDate date, String name) implements Comparable<PreviousSaveDTO> {

    public PreviousSaveDTO(ExtractorSaveDTO save, String id) {
        this(id, save.getDate(), save.getName());
    }

    @Override
    public int compareTo(PreviousSaveDTO o) {
        return Comparator.comparing(PreviousSaveDTO::date).compare(this, o);
    }
}
