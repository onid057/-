package com.a407.back.controller;

import com.a407.back.config.constants.SuccessCode;
import com.a407.back.dto.room.MakePublicRoomRequest;
import com.a407.back.dto.room.PublicRoomDetailResponse;
import com.a407.back.dto.room.RoomNotificationListResponse;
import com.a407.back.dto.util.ApiResponse;
import com.a407.back.model.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rooms")
public class RoomController {

    private final RoomService roomService;

    @PostMapping
    public ResponseEntity<ApiResponse<Long>> makePublicRoom(
        @RequestBody MakePublicRoomRequest makePublicRoomRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(
            new ApiResponse<>(SuccessCode.INSERT_SUCCESS,
                roomService.makePublicRoom(makePublicRoomRequest)));
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<ApiResponse<PublicRoomDetailResponse>> getPublicRoomDetail(
        @PathVariable("roomId") Long roomId) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS, roomService.getPublicRoomDetail(roomId)));
    }

    @DeleteMapping("/{roomId}")
    public ResponseEntity<ApiResponse<String>> deletePublicRoom(
        @PathVariable("roomId") Long roomId) {
        roomService.deletePublicRoom(roomId);
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.DELETE_SUCCESS, "방 삭제가 완료되었습니다."));
    }

    @GetMapping("/{roomId}/notifications")
    public ResponseEntity<ApiResponse<RoomNotificationListResponse>> getRoomNotificationList(
        @PathVariable("roomId") Long roomId) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                roomService.getRoomNotificationList(roomId)));
    }

}
