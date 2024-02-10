package com.a407.back.controller;

import com.a407.back.config.constants.ErrorCode;
import com.a407.back.config.constants.SuccessCode;
import com.a407.back.dto.board.BoardListResponse;
import com.a407.back.dto.notification.NotificationListResponse;
import com.a407.back.dto.room.UserPublicRoomListResponse;
import com.a407.back.dto.user.UserAccountRequest;
import com.a407.back.dto.user.UserAccountResponse;
import com.a407.back.dto.user.UserCertificationRequest;
import com.a407.back.dto.user.UserChangeRequest;
import com.a407.back.dto.user.UserComplainRequest;
import com.a407.back.dto.user.UserCreateRequest;
import com.a407.back.dto.user.UserDetailInfoResponse;
import com.a407.back.dto.user.UserInfoResponse;
import com.a407.back.dto.user.UserNearZipsaInfoResponse;
import com.a407.back.dto.user.UserNearZipsaLocationResponse;
import com.a407.back.dto.user.UserNearZipsaRequest;
import com.a407.back.dto.user.UserPhoneNumberRequest;
import com.a407.back.dto.user.UserRecordsResponse;
import com.a407.back.dto.user.UserReservationInfoResponse;
import com.a407.back.dto.util.ApiResponse;
import com.a407.back.dto.util.ReservationResponse;
import com.a407.back.exception.CustomException;
import com.a407.back.model.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @GetMapping("/")
    public ResponseEntity<String> testServer() {
        return ResponseEntity.status(HttpStatus.OK).body("server 이상 무");
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserInfoResponse>> findUserInfo(
        @PathVariable Long userId) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                userService.findUserInfo(userId)));
    }

    // 알림 목록
    @GetMapping("/{userId}/notifications")
    public ResponseEntity<ApiResponse<List<NotificationListResponse>>> getNotificationList(
        @PathVariable("userId") Long userId) {
        List<NotificationListResponse> notificationResponseList = userService.findNotificationByUserIdList(
            userId);
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.SELECT_SUCCESS, notificationResponseList));
    }

    // 회원가입
    @PostMapping
    public ResponseEntity<ApiResponse<Long>> makeUser(
        @RequestBody UserCreateRequest userCreateRequest) {
        long id = userService.makeUser(userCreateRequest);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(new ApiResponse<>(SuccessCode.INSERT_SUCCESS, id));
    }

    @PostMapping("/helpers-map/{userId}")
    public ResponseEntity<ApiResponse<List<UserNearZipsaLocationResponse>>> getNearUserLocationList(
        @PathVariable Long userId) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                userService.findNearZipsaLocationList(userId)));
    }

    @PostMapping("/helpers-map")
    public ResponseEntity<ApiResponse<List<UserNearZipsaInfoResponse>>> getNearUserInfoList(
        @RequestBody UserNearZipsaRequest userNearZipsaRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                userService.findNearZipsaInfoList(userNearZipsaRequest)));
    }

    @GetMapping("/{userId}/records")
    public ResponseEntity<ApiResponse<List<UserRecordsResponse>>> getUserRecordList(
        @PathVariable Long userId) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS, userService.getUserRecordList(userId)));
    }


    @GetMapping("/reservations/{roomId}")
    public ResponseEntity<ApiResponse<UserReservationInfoResponse>> getUserReservationInfo(
        @PathVariable Long roomId) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                userService.getUserReservationInfo(roomId)));
    }

    @GetMapping("/{userId}/reservations")
    public ResponseEntity<ApiResponse<List<ReservationResponse>>> getUserReservationList(
        @PathVariable Long userId) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                userService.getUserReservationList(userId)));
    }

    @GetMapping("/{userId}/reservations/first")
    public ResponseEntity<ApiResponse<ReservationResponse>> getUserReservationFirst(
        @PathVariable Long userId) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                userService.getUserReservationFirst(userId)));
    }

    @PostMapping("/payments")
    public ResponseEntity<ApiResponse<UserAccountResponse>> makeAccount(
        @RequestBody UserAccountRequest request) {
        UserAccountResponse response = userService.makeAccount(request);
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.INSERT_SUCCESS, response));
    }

    @GetMapping("/{userId}/payments/detail")
    public ResponseEntity<ApiResponse<String>> getMaskedCardNumber(@PathVariable Long userId) {
        String maskedCardNumber = userService.getMaskedCardNumber(userId);
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.SELECT_SUCCESS, maskedCardNumber));
    }

    @DeleteMapping("/{userId}/payments")
    public ResponseEntity<ApiResponse<String>> deleteAccount(@PathVariable Long userId) {
        userService.deleteAccount(userId);
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.DELETE_SUCCESS, "결제 정보 삭제"));
    }

    @GetMapping("/{userId}/boards")
    public ResponseEntity<ApiResponse<BoardListResponse>> getUserBoardList(
        @PathVariable("userId") Long userId, @RequestParam("page") int page,
        @RequestParam("size") int size) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                userService.getUserBoardList(userId, page, size)));
    }

    @PostMapping("/certification/phonenumber")
    public ResponseEntity<ApiResponse<String>> makeSendMessage(
        @RequestBody UserPhoneNumberRequest request)
        throws NoSuchAlgorithmException {
        try {
            userService.makeSendMessage(request.getPhoneNumber(), request.getEmail());
        } catch (JsonProcessingException e) {
            throw new CustomException(ErrorCode.INVALID_PARAMETER);
        }

        return ResponseEntity.status(HttpStatus.CREATED)
            .body(new ApiResponse<>(SuccessCode.INSERT_SUCCESS, "문자 발송 성공"));
    }

    @PostMapping("/certification/code")
    public ResponseEntity<ApiResponse<String>> makePhoneNumber(
        @RequestBody UserCertificationRequest request) throws JsonProcessingException {
        userService.makePhoneNumber(request.getCode(), request.getEmail());
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.INSERT_SUCCESS, "전화 번호 저장 성공"));
    }

    @PatchMapping("/{userId}/promise")
    public ResponseEntity<ApiResponse<String>> changeUserCertificated(@PathVariable Long userId) {
        userService.changeUserCertificated(userId);
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.INSERT_SUCCESS, "서약 결과 저장 성공"));
    }

    @PostMapping("/complaint")
    public ResponseEntity<ApiResponse<String>> makeComplain(
        @RequestBody UserComplainRequest userComplainRequest) {
        userService.makeComplain(userComplainRequest);
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.INSERT_SUCCESS, "신고 성공"));
    }

    @GetMapping("/{userId}/rooms")
    public ResponseEntity<ApiResponse<UserPublicRoomListResponse>> getUserPublicRoomList(
        @PathVariable("userId") Long userId) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                userService.getUserPublicRoomList(userId)));
    }

    @PatchMapping("/{userId}")
    public ResponseEntity<ApiResponse<String>> updateUserInfo(@PathVariable Long userId,
        @RequestPart(name = "image", required = false) MultipartFile image,
        @RequestPart(name = "request") UserChangeRequest userChangeRequest) throws IOException {
        userService.changeUserInfo(userId, userChangeRequest, image);
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.UPDATE_SUCCESS, "사용자 정보 수정 성공"));
    }

    @GetMapping("/{userId}/detail")
    public ResponseEntity<ApiResponse<UserDetailInfoResponse>> findUserDetailInfo(
        @PathVariable Long userId) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                userService.findUserDetailInfo(userId)));
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse<String>> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.DELETE_SUCCESS, "회원 정보 삭제 성공"));
    }

}
