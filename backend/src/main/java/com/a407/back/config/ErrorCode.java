package com.a407.back.config;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCode {
    // 400
    INVALID_PARAMETER(400, "파라미터 값을 확인해주세요."),
    // 401
    UNAUTHORIZED_ACCESS(401, "페이지에 관한 권한이 없습니다."),
    // 404
    USER_NOT_FOUND(404, "존재하지 않는 고객 ID입니다."),
    // 500
    INTERNAL_SERVER_ERROR(500, "서버 측 에러입니다.");

    private final int status;
    private final String message;
}
