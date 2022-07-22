package fr.osallek.osasaveviewer.controller.dto.save;

import java.time.LocalDate;

public record LoanDTO(LocalDate expiryDate, int amount, double interest) {
}
