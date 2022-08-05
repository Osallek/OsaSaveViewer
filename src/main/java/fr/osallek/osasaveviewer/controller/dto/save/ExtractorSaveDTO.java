package fr.osallek.osasaveviewer.controller.dto.save;

import java.time.LocalDate;
import java.util.List;
import java.util.SortedSet;

public final class ExtractorSaveDTO {

    private LocalDate startDate;

    private String owner;

    private String country;

    private String countryName;

    private String version;

    private String previousSave;

    private String name;

    private String provinceImage;

    private String colorsImage;

    private LocalDate date;

    private int nbProvinces;

    private List<TeamDTO> teams;

    private List<ProvinceDTO> provinces;

    private List<SimpleProvinceDTO> oceansProvinces;

    private List<SimpleProvinceDTO> lakesProvinces;

    private List<SimpleProvinceDTO> impassableProvinces;

    private List<CountryDTO> countries;

    private List<AreaDTO> areas;

    private List<AdvisorDTO> advisors;

    private List<CultureDTO> cultures;

    private List<ReligionDTO> religions;

    private EmpireDTO hre;

    private CelestialEmpireDTO celestialEmpire;

    private List<InstitutionDTO> institutions;

    private DiplomacyDTO diplomacy;

    private List<NamedImageLocalisedDTO> buildings;

    private List<NamedImageLocalisedDTO> advisorTypes;

    private List<ColorNamedImageLocalisedDTO> tradeGoods;

    private List<ColorNamedImageLocalisedDTO> estates;

    private List<NamedImageLocalisedDTO> estatePrivileges;

    private List<NamedLocalisedDTO> subjectTypes;

    private List<IdeaGroupDTO> ideaGroups;

    private List<NamedImageLocalisedDTO> personalities;

    private List<NamedImageLocalisedDTO> leaderPersonalities;

    private SortedSet<PreviousSaveDTO> previousSaves;

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getPreviousSave() {
        return previousSave;
    }

    public void setPreviousSave(String previousSave) {
        this.previousSave = previousSave;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProvinceImage() {
        return provinceImage;
    }

    public void setProvinceImage(String provinceImage) {
        this.provinceImage = provinceImage;
    }

    public String getColorsImage() {
        return colorsImage;
    }

    public void setColorsImage(String colorsImage) {
        this.colorsImage = colorsImage;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getNbProvinces() {
        return nbProvinces;
    }

    public void setNbProvinces(int nbProvinces) {
        this.nbProvinces = nbProvinces;
    }

    public List<TeamDTO> getTeams() {
        return teams;
    }

    public void setTeams(List<TeamDTO> teams) {
        this.teams = teams;
    }

    public List<ProvinceDTO> getProvinces() {
        return provinces;
    }

    public void setProvinces(List<ProvinceDTO> provinces) {
        this.provinces = provinces;
    }

    public List<SimpleProvinceDTO> getOceansProvinces() {
        return oceansProvinces;
    }

    public void setOceansProvinces(List<SimpleProvinceDTO> oceansProvinces) {
        this.oceansProvinces = oceansProvinces;
    }

    public List<SimpleProvinceDTO> getLakesProvinces() {
        return lakesProvinces;
    }

    public void setLakesProvinces(List<SimpleProvinceDTO> lakesProvinces) {
        this.lakesProvinces = lakesProvinces;
    }

    public List<SimpleProvinceDTO> getImpassableProvinces() {
        return impassableProvinces;
    }

    public void setImpassableProvinces(List<SimpleProvinceDTO> impassableProvinces) {
        this.impassableProvinces = impassableProvinces;
    }

    public List<CountryDTO> getCountries() {
        return countries;
    }

    public void setCountries(List<CountryDTO> countries) {
        this.countries = countries;
    }

    public List<AreaDTO> getAreas() {
        return areas;
    }

    public void setAreas(List<AreaDTO> areas) {
        this.areas = areas;
    }

    public List<AdvisorDTO> getAdvisors() {
        return advisors;
    }

    public void setAdvisors(List<AdvisorDTO> advisors) {
        this.advisors = advisors;
    }

    public List<CultureDTO> getCultures() {
        return cultures;
    }

    public void setCultures(List<CultureDTO> cultures) {
        this.cultures = cultures;
    }

    public List<ReligionDTO> getReligions() {
        return religions;
    }

    public void setReligions(List<ReligionDTO> religions) {
        this.religions = religions;
    }

    public EmpireDTO getHre() {
        return hre;
    }

    public void setHre(EmpireDTO hre) {
        this.hre = hre;
    }

    public CelestialEmpireDTO getCelestialEmpire() {
        return celestialEmpire;
    }

    public void setCelestialEmpire(CelestialEmpireDTO celestialEmpire) {
        this.celestialEmpire = celestialEmpire;
    }

    public List<InstitutionDTO> getInstitutions() {
        return institutions;
    }

    public void setInstitutions(List<InstitutionDTO> institutions) {
        this.institutions = institutions;
    }

    public DiplomacyDTO getDiplomacy() {
        return diplomacy;
    }

    public void setDiplomacy(DiplomacyDTO diplomacy) {
        this.diplomacy = diplomacy;
    }

    public List<NamedImageLocalisedDTO> getBuildings() {
        return buildings;
    }

    public void setBuildings(List<NamedImageLocalisedDTO> buildings) {
        this.buildings = buildings;
    }

    public List<NamedImageLocalisedDTO> getAdvisorTypes() {
        return advisorTypes;
    }

    public void setAdvisorTypes(List<NamedImageLocalisedDTO> advisorTypes) {
        this.advisorTypes = advisorTypes;
    }

    public List<ColorNamedImageLocalisedDTO> getTradeGoods() {
        return tradeGoods;
    }

    public void setTradeGoods(List<ColorNamedImageLocalisedDTO> tradeGoods) {
        this.tradeGoods = tradeGoods;
    }

    public List<ColorNamedImageLocalisedDTO> getEstates() {
        return estates;
    }

    public void setEstates(List<ColorNamedImageLocalisedDTO> estates) {
        this.estates = estates;
    }

    public List<NamedImageLocalisedDTO> getEstatePrivileges() {
        return estatePrivileges;
    }

    public void setEstatePrivileges(List<NamedImageLocalisedDTO> estatePrivileges) {
        this.estatePrivileges = estatePrivileges;
    }

    public List<NamedLocalisedDTO> getSubjectTypes() {
        return subjectTypes;
    }

    public void setSubjectTypes(List<NamedLocalisedDTO> subjectTypes) {
        this.subjectTypes = subjectTypes;
    }

    public List<IdeaGroupDTO> getIdeaGroups() {
        return ideaGroups;
    }

    public void setIdeaGroups(List<IdeaGroupDTO> ideaGroups) {
        this.ideaGroups = ideaGroups;
    }

    public List<NamedImageLocalisedDTO> getPersonalities() {
        return personalities;
    }

    public void setPersonalities(List<NamedImageLocalisedDTO> personalities) {
        this.personalities = personalities;
    }

    public List<NamedImageLocalisedDTO> getLeaderPersonalities() {
        return leaderPersonalities;
    }

    public void setLeaderPersonalities(List<NamedImageLocalisedDTO> leaderPersonalities) {
        this.leaderPersonalities = leaderPersonalities;
    }

    public SortedSet<PreviousSaveDTO> getPreviousSaves() {
        return previousSaves;
    }

    public void setPreviousSaves(SortedSet<PreviousSaveDTO> previousSaves) {
        this.previousSaves = previousSaves;
    }
}
