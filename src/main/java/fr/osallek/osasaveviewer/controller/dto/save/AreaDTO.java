package fr.osallek.osasaveviewer.controller.dto.save;

import java.util.List;
import java.util.Map;

public record AreaDTO(List<Integer> provinces, Map<String, List<String>> investments, Map<String, CountryStateDTO> states) {
}
