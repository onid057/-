package com.a407.back.controller;

import com.a407.back.domain.Notification;
import com.a407.back.domain.Room;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.MatchCreateRequest;
import com.a407.back.dto.MatchSearchRequest;
import com.a407.back.model.service.MatchService;
import com.a407.back.model.service.NotificationService;
import com.a407.back.model.service.RoomService;
import com.a407.back.model.service.UserService;
import com.a407.back.model.service.ZipsaService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/matches")
public class MatchController {

    private final MatchService matchService;

    private final NotificationService notificationService;

    private final RoomService roomService;

    private final UserService userService;

    private final ZipsaService zipsaService;


    @GetMapping("/filter?majorCategory={majorCategory}&gender={gender}&age={age}&grade={grade}&score={score}")
    public ResponseEntity<List<Zipsa>> getZipsas(MatchSearchRequest condition) {
        List<Zipsa> zipsas = matchService.getMatchesByConditions(condition);
        return ResponseEntity.status(HttpStatus.OK).body(zipsas);
    }

    @PostMapping("/")
    public ResponseEntity<Long> makeMatch(@RequestBody MatchCreateRequest matchCreateRequest) {
        // 수락한 알림은 accept
        notificationService.changeNotificationStatusAcceptOrReject(
            matchCreateRequest.getNotificationId(), "accept");
        // 다른 알림들이 있다면 close
        Room room = roomService.findByRoomId(matchCreateRequest.getRoomId());
        notificationService.changeNotificationStatusClose(room);
        // 후에 방 상태 변경
        roomService.chageRoomStatus(matchCreateRequest.getRoomId(), "before");

        // 집사 아이디 입력
        Notification notification = notificationService.findByNotificationId(
            matchCreateRequest.getNotificationId());
        boolean isZipsa = userService.isWorkedDistinction(notification.getReceiveId());
        Zipsa zipsa = null;
        if (isZipsa) {
            zipsa = zipsaService.findByZipsaId(notification.getReceiveId());
        } else {
            zipsa = zipsaService.findByZipsaId(notification.getSendId());
        }
        roomService.changeRoomZipsa(zipsa, matchCreateRequest.getRoomId());
        return ResponseEntity.status(HttpStatus.OK).body(matchCreateRequest.getRoomId());
    }
}
