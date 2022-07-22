package fr.osallek.osasaveviewer.common.exception;

public class PreviousSaveDoesNotExistException extends RuntimeException {


    public PreviousSaveDoesNotExistException(String message) {
        super(message);
    }

    public PreviousSaveDoesNotExistException(String message, Throwable cause) {
        super(message, cause);
    }

}
