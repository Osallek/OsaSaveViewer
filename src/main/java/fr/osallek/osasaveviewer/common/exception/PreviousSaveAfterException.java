package fr.osallek.osasaveviewer.common.exception;

public class PreviousSaveAfterException extends RuntimeException {


    public PreviousSaveAfterException(String message) {
        super(message);
    }

    public PreviousSaveAfterException(String message, Throwable cause) {
        super(message, cause);
    }

}
