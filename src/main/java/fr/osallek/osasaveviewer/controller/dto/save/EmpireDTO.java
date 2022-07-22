package fr.osallek.osasaveviewer.controller.dto.save;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public class EmpireDTO {

    private List<OldEmperorDTO> oldEmperors;

    private  boolean dismantled;

    private Map<String, Boolean> mainLineReforms;

    private Map<String, Boolean> leftBranchReforms;

    private Map<String, Boolean> rightBranchReforms;

    private double influence;

    private LocalDate dismantleDate;

    public List<OldEmperorDTO> getOldEmperors() {
        return oldEmperors;
    }

    public void setOldEmperors(List<OldEmperorDTO> oldEmperors) {
        this.oldEmperors = oldEmperors;
    }

    public boolean isDismantled() {
        return dismantled;
    }

    public void setDismantled(boolean dismantled) {
        this.dismantled = dismantled;
    }

    public Map<String, Boolean> getMainLineReforms() {
        return mainLineReforms;
    }

    public void setMainLineReforms(Map<String, Boolean> mainLineReforms) {
        this.mainLineReforms = mainLineReforms;
    }

    public Map<String, Boolean> getLeftBranchReforms() {
        return leftBranchReforms;
    }

    public void setLeftBranchReforms(Map<String, Boolean> leftBranchReforms) {
        this.leftBranchReforms = leftBranchReforms;
    }

    public Map<String, Boolean> getRightBranchReforms() {
        return rightBranchReforms;
    }

    public void setRightBranchReforms(Map<String, Boolean> rightBranchReforms) {
        this.rightBranchReforms = rightBranchReforms;
    }

    public double getInfluence() {
        return influence;
    }

    public void setInfluence(double influence) {
        this.influence = influence;
    }

    public LocalDate getDismantleDate() {
        return dismantleDate;
    }

    public void setDismantleDate(LocalDate dismantleDate) {
        this.dismantleDate = dismantleDate;
    }
}
