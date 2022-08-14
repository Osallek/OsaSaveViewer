package fr.osallek.osasaveviewer.controller.dto.save;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public class WarDTO {

    private int id;

    private String name;

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer duration;

    private boolean finished;

    private Map<String, WarParticipantDTO> attackers;

    private Map<String, WarParticipantDTO> defenders;

    private Double defenderScore;

    private Integer outcome;

    private List<WarHistoryEventDTO> history;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public boolean isFinished() {
        return finished;
    }

    public void setFinished(boolean finished) {
        this.finished = finished;
    }

    public Map<String, WarParticipantDTO> getAttackers() {
        return attackers;
    }

    public void setAttackers(Map<String, WarParticipantDTO> attackers) {
        this.attackers = attackers;
    }

    public Map<String, WarParticipantDTO> getDefenders() {
        return defenders;
    }

    public void setDefenders(Map<String, WarParticipantDTO> defenders) {
        this.defenders = defenders;
    }

    public Double getDefenderScore() {
        return defenderScore;
    }

    public void setDefenderScore(Double defenderScore) {
        this.defenderScore = defenderScore;
    }

    public Integer getOutcome() {
        return outcome;
    }

    public void setOutcome(Integer outcome) {
        this.outcome = outcome;
    }

    public List<WarHistoryEventDTO> getHistory() {
        return history;
    }

    public void setHistory(List<WarHistoryEventDTO> history) {
        this.history = history;
    }
}
