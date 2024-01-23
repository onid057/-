package com.a407.back.config;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum SuccessCode {
    // 조회 성공!!
    SELECT_SUCCESS(200, "SELECT SUCCESS"),
    // 삭제 성공!!
    DELETE_SUCCESS(200, "DELETE SUCCESS"),
    // 삽입 성공!!
    INSERT_SUCCESS(201, "INSERT SUCCESS"),
    // 수정 성공!!
    UPDATE_SUCCESS(204, "UPDATE SUCCESS");

    private final int status;
    private final String message;
}