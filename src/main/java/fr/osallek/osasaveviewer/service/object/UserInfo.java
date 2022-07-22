package fr.osallek.osasaveviewer.service.object;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.osasaveviewer.controller.dto.ServerSaveDTO;
import fr.osallek.osasaveviewer.controller.dto.save.ExtractorSaveDTO;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.apache.commons.collections4.CollectionUtils;

public class UserInfo {

    private String id;

    private List<ServerSaveDTO> saves;

    public UserInfo(String id) {
        this.id = id;
    }

    public UserInfo(String id, ServerSaveDTO save) {
        this.id = id;
        this.saves = List.of(save);
    }

    @JsonCreator
    public UserInfo(String id, List<ServerSaveDTO> saves) {
        this.id = id;
        this.saves = saves;
    }

    @JsonIgnore
    public ServerSaveDTO addSave(ExtractorSaveDTO save, String id) {
        if (CollectionUtils.isEmpty(this.saves)) {
            this.saves = new ArrayList<>();
        }

        ServerSaveDTO serverSave = new ServerSaveDTO(save.getName(), LocalDateTime.now(), save.getDate(), id);

        this.saves.add(serverSave);

        return serverSave;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<ServerSaveDTO> getSaves() {
        return saves;
    }

    public void setSaves(List<ServerSaveDTO> saves) {
        this.saves = saves;
    }
}
