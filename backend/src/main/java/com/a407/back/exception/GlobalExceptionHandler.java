package com.a407.back.exception;

import com.a407.back.config.constants.ErrorCode;
import com.a407.back.dto.util.ErrorResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.servlet.NoHandlerFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    // 임의로 보내는 예외 처리
    @ExceptionHandler(CustomException.class)
    protected ResponseEntity<ErrorResponse> handleCustomException(CustomException ex) {
        log.error("CustomException", ex);
        return new ResponseEntity<>(new ErrorResponse(ex.getErrorCode()),
            HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }

    // 객체 혹은 파라미터 값이 유효하지 않음
    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(
        MethodArgumentNotValidException ex) {
        log.error("handleMethodArgumentNotValidException", ex);
        ErrorResponse errorResponse = new ErrorResponse(ErrorCode.INVALID_PARAMETER);
        return new ResponseEntity<>(errorResponse,
            HttpStatus.valueOf(errorResponse.getStatus()));
    }

    // Body에 객체 데이터가 넘어오지 않음
    @ExceptionHandler(HttpMessageNotReadableException.class)
    protected ResponseEntity<ErrorResponse> handleHttpMessageNotReadableException(
        HttpMessageNotReadableException ex) {
        log.error("handleHttpMessageNotReadableException", ex);
        ErrorResponse errorResponse = new ErrorResponse(ErrorCode.REQUEST_BODY_MISSING_ERROR);
        return new ResponseEntity<>(errorResponse,
            HttpStatus.valueOf(errorResponse.getStatus()));
    }

    // Request 파라미터에 데이터가 넘어오지 않음
    @ExceptionHandler(MissingServletRequestParameterException.class)
    protected ResponseEntity<ErrorResponse> handleMissingServletRequestParameterException(
        MissingServletRequestParameterException ex) {
        log.error("handleMissingServletRequestParameterException", ex);
        ErrorResponse errorResponse = new ErrorResponse(ErrorCode.MISSING_REQUEST_PARAMETER_ERROR);
        return new ResponseEntity<>(errorResponse,
            HttpStatus.valueOf(errorResponse.getStatus()));
    }

    // 잘못된 서버 요청
    @ExceptionHandler(HttpClientErrorException.BadRequest.class)
    protected ResponseEntity<ErrorResponse> handleHttpClientErrorExceptionBadRequestException(
        HttpClientErrorException ex) {
        log.error("handleHttpClientErrorExceptionBadRequestException", ex);
        ErrorResponse errorResponse = new ErrorResponse(ErrorCode.BAD_REQUEST_ERROR);
        return new ResponseEntity<>(errorResponse,
            HttpStatus.valueOf(errorResponse.getStatus()));
    }

    // 잘못된 주소로 요청
    @ExceptionHandler(NoHandlerFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    protected ResponseEntity<ErrorResponse> handleNoHandlerFoundException(
        NoHandlerFoundException ex) {
        log.error("handleNoHandlerFoundException", ex);
        ErrorResponse errorResponse = new ErrorResponse(ErrorCode.NOT_FOUND_ERROR);
        return new ResponseEntity<>(errorResponse,
            HttpStatus.valueOf(errorResponse.getStatus()));
    }

    // 이외 모든 Exception
    // 서버가 처리할 방법을 모르는 경우
    @ExceptionHandler(Exception.class)
    protected ResponseEntity<ErrorResponse> handleException(Exception ex) {
        log.error("Exception", ex);
        ErrorResponse errorResponse = new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>(errorResponse,
            HttpStatus.valueOf(errorResponse.getStatus()));
    }

}
