package fr.osallek.osasaveviewer.controller.dto.save;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public record CountryHistoryDTO(LocalDate date, Boolean abolishedSerfdom, LeaderDTO leader, Map<String, Boolean> ideasLevel, List<String> addAcceptedCultures,
                                List<String> removeAcceptedCultures, Integer governmentRank, Integer capital, String changedCountryNameFrom,
                                String changedCountryAdjectiveFrom, ColorDTO changedCountryMapcolorFrom, String addGovernmentReform, String primaryCulture,
                                String government, String religion, String secondaryReligion, String technologyGroup, String unitType, String changedTagFrom,
                                String religiousSchool, String setCountryFlag, String decision, QueenDTO queen, QueenDTO monarchConsort, MonarchDTO monarch,
                                HeirDTO monarchHeir, HeirDTO heir, HeirDTO monarchForeignHeir, Integer union, Integer tradePort, Boolean elector) {
}
