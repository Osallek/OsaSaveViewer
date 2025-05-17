package fr.osallek.osasaveviewer.controller;

import fr.osallek.osasaveviewer.common.exception.PreviousSaveAfterException;
import fr.osallek.osasaveviewer.common.exception.PreviousSaveDoesNotExistException;
import fr.osallek.osasaveviewer.common.exception.UnauthorizedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.PropertyAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import javax.xml.datatype.DatatypeConfigurationException;

@RestControllerAdvice
public class ExceptionTranslator {

    private static final Logger LOGGER = LoggerFactory.getLogger(ExceptionTranslator.class);

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleInterruptedException(InterruptedException e) {
        LOGGER.error(e.getMessage(), e);

        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.DEFAULT_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleException(Exception e) {
        LOGGER.error(e.getMessage(), e);

        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.DEFAULT_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleMissingServletRequestParameterException(MissingServletRequestParameterException e) {
        LOGGER.error(e.getMessage(), e);

        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.MISSING_PARAMETER), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handlePropertyAccessException(PropertyAccessException e) {
        LOGGER.error(e.getMessage(), e);

        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.INVALID_PARAMETER), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleDatatypeConfigurationException(DatatypeConfigurationException e) {
        LOGGER.error(e.getMessage(), e);

        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.DEFAULT_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handlePreviousSaveDoesNotExistException(PreviousSaveDoesNotExistException e) {
        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.PREVIOUS_SAVE_DOES_NOT_EXIST), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handlePreviousSaveAfterException(PreviousSaveAfterException e) {
        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.PREVIOUS_SAVE_AFTER), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleUnauthorizedException(UnauthorizedException e) {
        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.UNAUTHORIZED), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorObject<Void>> handleNoResourceFoundException(NoResourceFoundException e) {
        return new ResponseEntity<>(new ErrorObject<>(ErrorCode.NOT_FOUND), HttpStatus.NOT_FOUND);
    }
}
