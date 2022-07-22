package fr.osallek.osasaveviewer.controller.dto.save;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.Objects;
import org.apache.commons.lang3.ObjectUtils;

public record CountryPreviousSaveDTO(LocalDate date, String tag, String image, double dev, double income, int nbProvince, int maxManpower, int armyLimit,
                                     double armyProfessionalism, int losses) implements Comparable<CountryPreviousSaveDTO> {

    public CountryPreviousSaveDTO(ExtractorSaveDTO save, CountryDTO country) {
        this(save.getDate(), country.getTag(), country.getImage(), ObjectUtils.defaultIfNull(country.getDev(), 0d),
             ObjectUtils.defaultIfNull(country.getIncome(), 0d), ObjectUtils.defaultIfNull(country.getNbProvince(), 0),
             ObjectUtils.defaultIfNull(country.getMaxManpower(), 0), ObjectUtils.defaultIfNull(country.getArmyLimit(), 0),
             ObjectUtils.defaultIfNull(country.getArmyProfessionalism(), 0d),
             country.getLosses().values().stream().filter(Objects::nonNull).mapToInt(Integer::intValue).sum());
    }

    @Override
    public int compareTo(CountryPreviousSaveDTO o) {
        return Comparator.comparing(CountryPreviousSaveDTO::date).compare(this, o);
    }
}
