package com.a407.back.exception;

import com.a407.back.dto.ErrorResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());


    @ExceptionHandler({CustomException.class})
    protected ResponseEntity<ErrorResponse> handleCustomException(CustomException ex) {
        logger.error(String.valueOf(ex.getErrorCode()));
        return new ResponseEntity<ErrorResponse>(new ErrorResponse(ex.getErrorCode()),
            HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }
}
