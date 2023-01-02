package fr.osallek.osasaveviewer.controller.dto.save;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.SortedMap;
import java.util.SortedSet;

public class CountryDTO extends ImageLocalised {

    private String tag;

    private String customName;

    private List<String> players;

    private Integer nbProvince;

    private Double dev;

    private Integer greatPowerRank;

    private Map<String, LocalDate> flags;

    private Map<String, LocalDate> hiddenFlags;

    private Map<String, Double> variables;

    private ColorsDTO colors;

    private int milTech;

    private int admTech;

    private int dipTech;

    private List<EstateDTO> estates;

    private Map<String, Double> hegemony;

    private List<String> rivals;

    private double powerProjection;

    private List<LoanDTO> loans;

    private Map<String, Integer> ideaGroups;

    private GovernmentDTO government;
    private List<Integer> advisors;

    private Map<PowerSpent, Integer> admPowerSpent;

    private Map<PowerSpent, Integer> dipPowerSpent;

    private Map<PowerSpent, Integer> milPowerSpent;

    private List<CustomNationalIdeaDTO> customNationalIdeas;

    private List<MissionDTO> missions;

    private SortedMap<Integer, Integer> incomeStatistics;

    private SortedMap<Integer, Integer> nationSizeStatistics;

    private SortedMap<Integer, Integer> scoreStatistics;

    private SortedMap<Integer, Integer> inflationStatistics;

    private List<String> alliances;

    private List<String> guarantees;

    private List<String> guarantedBy;

    private String knowledgeSharing;

    private String knowledgeSharingBy;

    private Map<String, Double> subsidies;

    private Map<String, Double> subsidiesBy;

    private List<String> royalMarriages;

    private List<String> supportIndependence;

    private List<String> supportIndependenceBy;

    private List<String> transferTradePowers;

    private List<String> transferTradePowersBy;

    private List<String> warReparations;

    private List<String> atWarWith;

    private String warReparationsBy;

    private List<String> warnings;

    private List<String> warningsBy;

    private Double income;

    private Double prestige;

    private Integer stability;

    private Double inflation;

    private Double corruption;

    private String religion;

    private String primaryCulture;

    private List<String> acceptedCultures;

    private Double treasury;

    private Double armyProfessionalism;

    private Integer absolutism;

    private Integer mercantilism;

    private Double navyTradition;

    private Double armyTradition;

    private LocalDate lastBankrupt;

    private int manpower;

    private int maxManpower;

    private int armyLimit;

    private double armyMorale;

    private double discipline;

    private int sailors;

    private int maxSailors;

    private int navalLimit;

    private double navalMorale;

    private Map<Losses, Integer> losses;

    private double innovativeness;

    private Map<Expense, Double> expenses;

    private Map<Income, Double> incomes;

    private Map<Expense, Double> totalExpenses;

    private List<CountryHistoryDTO> history;

    private boolean alive;

    private int nbInstitutions;

    private SortedMap<LocalDate, String> changedTag;

    private SortedSet<CountryPreviousSaveDTO> previousSaves;

    @JsonIgnore
    public String getTagAtDate(LocalDate date) {
        if (CollectionUtils.isEmpty(this.history)) {
            return this.tag;
        }

        String tag = this.tag;

        for (int i = this.history.size() - 1; i >= 0; i--) {
            if (this.history.get(i).date().isBefore(date)) {
                break;
            }

            if (StringUtils.isNotBlank(this.history.get(i).changedTagFrom())) {
                tag = this.history.get(i).changedTagFrom();
            }
        }

        return tag;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getCustomName() {
        return customName;
    }

    public void setCustomName(String customName) {
        this.customName = customName;
    }

    public List<String> getPlayers() {
        return players;
    }

    public void setPlayers(List<String> players) {
        this.players = players;
    }

    public Integer getGreatPowerRank() {
        return greatPowerRank;
    }

    public void setGreatPowerRank(Integer greatPowerRank) {
        this.greatPowerRank = greatPowerRank;
    }

    public Integer getNbProvince() {
        return nbProvince;
    }

    public void setNbProvince(Integer nbProvince) {
        this.nbProvince = nbProvince;
    }

    public Double getDev() {
        return dev;
    }

    public void setDev(Double dev) {
        this.dev = dev;
    }

    public Map<String, LocalDate> getFlags() {
        return flags;
    }

    public void setFlags(Map<String, LocalDate> flags) {
        this.flags = flags;
    }

    public Map<String, LocalDate> getHiddenFlags() {
        return hiddenFlags;
    }

    public void setHiddenFlags(Map<String, LocalDate> hiddenFlags) {
        this.hiddenFlags = hiddenFlags;
    }

    public Map<String, Double> getVariables() {
        return variables;
    }

    public void setVariables(Map<String, Double> variables) {
        this.variables = variables;
    }

    public ColorsDTO getColors() {
        return colors;
    }

    public void setColors(ColorsDTO colors) {
        this.colors = colors;
    }

    public int getMilTech() {
        return milTech;
    }

    public void setMilTech(int milTech) {
        this.milTech = milTech;
    }

    public int getAdmTech() {
        return admTech;
    }

    public void setAdmTech(int admTech) {
        this.admTech = admTech;
    }

    public int getDipTech() {
        return dipTech;
    }

    public void setDipTech(int dipTech) {
        this.dipTech = dipTech;
    }

    public List<EstateDTO> getEstates() {
        return estates;
    }

    public void setEstates(List<EstateDTO> estates) {
        this.estates = estates;
    }

    public Map<String, Double> getHegemony() {
        return hegemony;
    }

    public void setHegemony(Map<String, Double> hegemony) {
        this.hegemony = hegemony;
    }

    public List<String> getRivals() {
        return rivals;
    }

    public void setRivals(List<String> rivals) {
        this.rivals = rivals;
    }

    public double getPowerProjection() {
        return powerProjection;
    }

    public void setPowerProjection(double powerProjection) {
        this.powerProjection = powerProjection;
    }

    public List<LoanDTO> getLoans() {
        return loans;
    }

    public void setLoans(List<LoanDTO> loans) {
        this.loans = loans;
    }

    public Map<String, Integer> getIdeaGroups() {
        return ideaGroups;
    }

    public void setIdeaGroups(Map<String, Integer> ideaGroups) {
        this.ideaGroups = ideaGroups;
    }

    public GovernmentDTO getGovernment() {
        return government;
    }

    public void setGovernment(GovernmentDTO government) {
        this.government = government;
    }

    public List<Integer> getAdvisors() {
        return advisors;
    }

    public void setAdvisors(List<Integer> advisors) {
        this.advisors = advisors;
    }

    public Map<PowerSpent, Integer> getAdmPowerSpent() {
        return admPowerSpent;
    }

    public void setAdmPowerSpent(Map<PowerSpent, Integer> admPowerSpent) {
        this.admPowerSpent = admPowerSpent;
    }

    public Map<PowerSpent, Integer> getDipPowerSpent() {
        return dipPowerSpent;
    }

    public void setDipPowerSpent(Map<PowerSpent, Integer> dipPowerSpent) {
        this.dipPowerSpent = dipPowerSpent;
    }

    public Map<PowerSpent, Integer> getMilPowerSpent() {
        return milPowerSpent;
    }

    public void setMilPowerSpent(Map<PowerSpent, Integer> milPowerSpent) {
        this.milPowerSpent = milPowerSpent;
    }

    public List<CustomNationalIdeaDTO> getCustomNationalIdeas() {
        return customNationalIdeas;
    }

    public void setCustomNationalIdeas(List<CustomNationalIdeaDTO> customNationalIdeas) {
        this.customNationalIdeas = customNationalIdeas;
    }

    public List<MissionDTO> getMissions() {
        return missions;
    }

    public void setMissions(List<MissionDTO> missions) {
        this.missions = missions;
    }

    public SortedMap<Integer, Integer> getIncomeStatistics() {
        return incomeStatistics;
    }

    public void setIncomeStatistics(SortedMap<Integer, Integer> incomeStatistics) {
        this.incomeStatistics = incomeStatistics;
    }

    public SortedMap<Integer, Integer> getNationSizeStatistics() {
        return nationSizeStatistics;
    }

    public void setNationSizeStatistics(SortedMap<Integer, Integer> nationSizeStatistics) {
        this.nationSizeStatistics = nationSizeStatistics;
    }

    public SortedMap<Integer, Integer> getScoreStatistics() {
        return scoreStatistics;
    }

    public void setScoreStatistics(SortedMap<Integer, Integer> scoreStatistics) {
        this.scoreStatistics = scoreStatistics;
    }

    public SortedMap<Integer, Integer> getInflationStatistics() {
        return inflationStatistics;
    }

    public void setInflationStatistics(SortedMap<Integer, Integer> inflationStatistics) {
        this.inflationStatistics = inflationStatistics;
    }

    public List<String> getAlliances() {
        return alliances;
    }

    public void setAlliances(List<String> alliances) {
        this.alliances = alliances;
    }

    public List<String> getGuarantees() {
        return guarantees;
    }

    public void setGuarantees(List<String> guarantees) {
        this.guarantees = guarantees;
    }

    public List<String> getGuarantedBy() {
        return guarantedBy;
    }

    public void setGuarantedBy(List<String> guarantedBy) {
        this.guarantedBy = guarantedBy;
    }

    public String getKnowledgeSharing() {
        return knowledgeSharing;
    }

    public void setKnowledgeSharing(String knowledgeSharing) {
        this.knowledgeSharing = knowledgeSharing;
    }

    public String getKnowledgeSharingBy() {
        return knowledgeSharingBy;
    }

    public void setKnowledgeSharingBy(String knowledgeSharingBy) {
        this.knowledgeSharingBy = knowledgeSharingBy;
    }

    public Map<String, Double> getSubsidies() {
        return subsidies;
    }

    public void setSubsidies(Map<String, Double> subsidies) {
        this.subsidies = subsidies;
    }

    public Map<String, Double> getSubsidiesBy() {
        return subsidiesBy;
    }

    public void setSubsidiesBy(Map<String, Double> subsidiesBy) {
        this.subsidiesBy = subsidiesBy;
    }

    public List<String> getRoyalMarriages() {
        return royalMarriages;
    }

    public void setRoyalMarriages(List<String> royalMarriages) {
        this.royalMarriages = royalMarriages;
    }

    public List<String> getSupportIndependence() {
        return supportIndependence;
    }

    public void setSupportIndependence(List<String> supportIndependence) {
        this.supportIndependence = supportIndependence;
    }

    public List<String> getSupportIndependenceBy() {
        return supportIndependenceBy;
    }

    public void setSupportIndependenceBy(List<String> supportIndependenceBy) {
        this.supportIndependenceBy = supportIndependenceBy;
    }

    public List<String> getTransferTradePowers() {
        return transferTradePowers;
    }

    public void setTransferTradePowers(List<String> transferTradePowers) {
        this.transferTradePowers = transferTradePowers;
    }

    public List<String> getTransferTradePowersBy() {
        return transferTradePowersBy;
    }

    public void setTransferTradePowersBy(List<String> transferTradePowersBy) {
        this.transferTradePowersBy = transferTradePowersBy;
    }

    public List<String> getWarReparations() {
        return warReparations;
    }

    public void setWarReparations(List<String> warReparations) {
        this.warReparations = warReparations;
    }

    public List<String> getAtWarWith() {
        return atWarWith;
    }

    public void setAtWarWith(List<String> atWarWith) {
        this.atWarWith = atWarWith;
    }

    public String getWarReparationsBy() {
        return warReparationsBy;
    }

    public void setWarReparationsBy(String warReparationsBy) {
        this.warReparationsBy = warReparationsBy;
    }

    public List<String> getWarnings() {
        return warnings;
    }

    public void setWarnings(List<String> warnings) {
        this.warnings = warnings;
    }

    public List<String> getWarningsBy() {
        return warningsBy;
    }

    public void setWarningsBy(List<String> warningsBy) {
        this.warningsBy = warningsBy;
    }

    public Double getIncome() {
        return income;
    }

    public void setIncome(Double income) {
        this.income = income;
    }

    public Double getPrestige() {
        return prestige;
    }

    public void setPrestige(Double prestige) {
        this.prestige = prestige;
    }

    public Integer getStability() {
        return stability;
    }

    public void setStability(Integer stability) {
        this.stability = stability;
    }

    public Double getInflation() {
        return inflation;
    }

    public void setInflation(Double inflation) {
        this.inflation = inflation;
    }

    public Double getCorruption() {
        return corruption;
    }

    public void setCorruption(Double corruption) {
        this.corruption = corruption;
    }

    public String getReligion() {
        return religion;
    }

    public void setReligion(String religion) {
        this.religion = religion;
    }

    public String getPrimaryCulture() {
        return primaryCulture;
    }

    public void setPrimaryCulture(String primaryCulture) {
        this.primaryCulture = primaryCulture;
    }

    public List<String> getAcceptedCultures() {
        return acceptedCultures;
    }

    public void setAcceptedCultures(List<String> acceptedCultures) {
        this.acceptedCultures = acceptedCultures;
    }

    public Double getTreasury() {
        return treasury;
    }

    public void setTreasury(Double treasury) {
        this.treasury = treasury;
    }

    public Double getArmyProfessionalism() {
        return armyProfessionalism;
    }

    public void setArmyProfessionalism(Double armyProfessionalism) {
        this.armyProfessionalism = armyProfessionalism;
    }

    public Integer getAbsolutism() {
        return absolutism;
    }

    public void setAbsolutism(Integer absolutism) {
        this.absolutism = absolutism;
    }

    public Integer getMercantilism() {
        return mercantilism;
    }

    public void setMercantilism(Integer mercantilism) {
        this.mercantilism = mercantilism;
    }

    public Double getNavyTradition() {
        return navyTradition;
    }

    public void setNavyTradition(Double navyTradition) {
        this.navyTradition = navyTradition;
    }

    public Double getArmyTradition() {
        return armyTradition;
    }

    public void setArmyTradition(Double armyTradition) {
        this.armyTradition = armyTradition;
    }

    public LocalDate getLastBankrupt() {
        return lastBankrupt;
    }

    public void setLastBankrupt(LocalDate lastBankrupt) {
        this.lastBankrupt = lastBankrupt;
    }

    public int getManpower() {
        return manpower;
    }

    public void setManpower(int manpower) {
        this.manpower = manpower;
    }

    public int getMaxManpower() {
        return maxManpower;
    }

    public void setMaxManpower(int maxManpower) {
        this.maxManpower = maxManpower;
    }

    public int getArmyLimit() {
        return armyLimit;
    }

    public void setArmyLimit(int armyLimit) {
        this.armyLimit = armyLimit;
    }

    public double getArmyMorale() {
        return armyMorale;
    }

    public void setArmyMorale(double armyMorale) {
        this.armyMorale = armyMorale;
    }

    public double getDiscipline() {
        return discipline;
    }

    public void setDiscipline(double discipline) {
        this.discipline = discipline;
    }

    public int getSailors() {
        return sailors;
    }

    public void setSailors(int sailors) {
        this.sailors = sailors;
    }

    public int getMaxSailors() {
        return maxSailors;
    }

    public void setMaxSailors(int maxSailors) {
        this.maxSailors = maxSailors;
    }

    public int getNavalLimit() {
        return navalLimit;
    }

    public void setNavalLimit(int navalLimit) {
        this.navalLimit = navalLimit;
    }

    public double getNavalMorale() {
        return navalMorale;
    }

    public void setNavalMorale(double navalMorale) {
        this.navalMorale = navalMorale;
    }

    public Map<Losses, Integer> getLosses() {
        return losses;
    }

    public void setLosses(Map<Losses, Integer> losses) {
        this.losses = losses;
    }

    public double getInnovativeness() {
        return innovativeness;
    }

    public void setInnovativeness(double innovativeness) {
        this.innovativeness = innovativeness;
    }

    public Map<Expense, Double> getExpenses() {
        return expenses;
    }

    public void setExpenses(Map<Expense, Double> expenses) {
        this.expenses = expenses;
    }

    public Map<Income, Double> getIncomes() {
        return incomes;
    }

    public void setIncomes(Map<Income, Double> incomes) {
        this.incomes = incomes;
    }

    public Map<Expense, Double> getTotalExpenses() {
        return totalExpenses;
    }

    public void setTotalExpenses(Map<Expense, Double> totalExpenses) {
        this.totalExpenses = totalExpenses;
    }

    public List<CountryHistoryDTO> getHistory() {
        return history;
    }

    public void setHistory(List<CountryHistoryDTO> history) {
        this.history = history;
    }

    public boolean isAlive() {
        return alive;
    }

    public void setAlive(boolean alive) {
        this.alive = alive;
    }

    public int getNbInstitutions() {
        return nbInstitutions;
    }

    public void setNbInstitutions(int nbInstitutions) {
        this.nbInstitutions = nbInstitutions;
    }

    public SortedMap<LocalDate, String> getChangedTag() {
        return changedTag;
    }

    public void setChangedTag(SortedMap<LocalDate, String> changedTag) {
        this.changedTag = changedTag;
    }

    public SortedSet<CountryPreviousSaveDTO> getPreviousSaves() {
        return previousSaves;
    }

    public void setPreviousSaves(SortedSet<CountryPreviousSaveDTO> previousSaves) {
        this.previousSaves = previousSaves;
    }
}
