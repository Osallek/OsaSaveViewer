package fr.osallek.osasaveviewer.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import fr.osallek.osasaveviewer.controller.dto.save.CountryDTO;
import fr.osallek.osasaveviewer.controller.dto.save.ExtractorSaveDTO;
import fr.osallek.osasaveviewer.controller.dto.save.ImageLocalised;
import fr.osallek.osasaveviewer.controller.dto.save.WarDTO;

import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class BotSaveDTO extends NameDTO {

    @JsonProperty("wars")
    private Map<Integer, NameDTO> wars;

    @JsonProperty("countries")
    private Map<String, ImageLocalised> countries;

    public BotSaveDTO() {
    }

    public BotSaveDTO(ExtractorSaveDTO save) {
        super(save.getName());
        this.wars = save.getWars().stream().collect(Collectors.toMap(WarDTO::getId, w -> new NameDTO(w.getName())));
        this.countries = save.getCountries().stream().collect(Collectors.toMap(CountryDTO::getTag, ImageLocalised::new));
    }

    public Map<Integer, NameDTO> getWars() {
        return wars;
    }

    public void setWars(Map<Integer, NameDTO> wars) {
        this.wars = wars;
    }

    public Map<String, ImageLocalised> getCountries() {
        return countries;
    }

    public void setCountries(Map<String, ImageLocalised> countries) {
        this.countries = countries;
    }
}
