package fr.osallek.osasaveviewer.controller.dto.save;

import java.util.List;

public class IdeaGroupDTO extends NamedImageLocalisedDTO {

    private List<NamedImageLocalisedDTO> ideas;

    public List<NamedImageLocalisedDTO> getIdeas() {
        return ideas;
    }

    public void setIdeas(List<NamedImageLocalisedDTO> ideas) {
        this.ideas = ideas;
    }
}
