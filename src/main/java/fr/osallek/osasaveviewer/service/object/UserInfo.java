package fr.osallek.osasaveviewer.service.object;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.osasaveviewer.controller.dto.ServerSaveDTO;
import fr.osallek.osasaveviewer.controller.dto.save.CountryDTO;
import fr.osallek.osasaveviewer.controller.dto.save.ExtractorSaveDTO;
import fr.osallek.osasaveviewer.service.object.stream.Player;
import org.apache.commons.collections4.CollectionUtils;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.SortedSet;
import java.util.TreeSet;

public class UserInfo {

    private String id;

    private String name;

    private String image;

    private SortedSet<ServerSaveDTO> saves;

    public UserInfo(String id) {
        this.id = id;
    }

    @JsonCreator
    public UserInfo(String id, String name, String image, SortedSet<ServerSaveDTO> saves) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.saves = saves;
    }

    @JsonIgnore
    public ServerSaveDTO addSave(ExtractorSaveDTO save, String id) {
        if (CollectionUtils.isEmpty(this.saves)) {
            this.saves = new TreeSet<>();
        }

        ServerSaveDTO serverSave = new ServerSaveDTO(save.getName(), LocalDateTime.now(ZoneId.of("UTC")), save.getDate(), id, save.getCountry(), save.getCountryName(),
                                                     save.getCountries()
                                                         .stream()
                                                         .filter(c -> save.getCountry().equals(c.getTag()))
                                                         .findFirst()
                                                         .map(CountryDTO::getImage)
                                                         .orElse(null),
                                                     save.getVersion(),
                                                     save.getCountries().stream().map(CountryDTO::getPlayers).filter(CollectionUtils::isNotEmpty).count(),
                                                     this.id, this.name, this.image);

        this.saves.add(serverSave);

        return serverSave;
    }

    @JsonIgnore
    public void update(Player player) {
        this.name = player.getPersonaName();
        this.image = player.getAvatarFull();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public SortedSet<ServerSaveDTO> getSaves() {
        return saves;
    }

    public void setSaves(SortedSet<ServerSaveDTO> saves) {
        this.saves = saves;
    }
}
