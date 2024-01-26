package com.a407.back.controller;

import com.a407.back.config.SuccessCode;
import com.a407.back.dto.util.ApiResponse;
import com.a407.back.dto.Match.MatchCreateRequest;
import com.a407.back.dto.Match.MatchSearchRequest;
import com.a407.back.dto.Match.MatchSearchResponse;
import com.a407.back.dto.Match.RoomCreateRequest;
import com.a407.back.model.service.MatchService;
import com.a407.back.model.service.RoomService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/matches")
public class MatchController {

    private final MatchService matchService;

    private final RoomService roomService;

    @GetMapping("/filter")
    public ResponseEntity<ApiResponse<List<MatchSearchResponse>>> getZipsas(
        @RequestParam(name = "majorCategory") String majorCategory,
        @RequestParam(name = "gender", required = false) String gender,
        @RequestParam(name = "age", required = false) String age,
        @RequestParam(name = "grade", required = false) String grade,
        @RequestParam(name = "score", required = false) String score) {

        // Parameter validation...
        MatchSearchRequest condition = new MatchSearchRequest(Long.parseLong(majorCategory), gender,
            age, grade, score);
        List<MatchSearchResponse> matchSearchResponses = matchService.getMatchSearchResponses(
            condition);
        ApiResponse<List<MatchSearchResponse>> response = new ApiResponse<>(
            SuccessCode.SELECT_SUCCESS, matchSearchResponses);
        return ResponseEntity.ok(response);
    }


    @PostMapping("/")
    public ResponseEntity<ApiResponse<Long>> makeMatch(
        @RequestBody MatchCreateRequest matchCreateRequest) {
        roomService.makeMatch(matchCreateRequest);
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.UPDATE_SUCCESS, matchCreateRequest.getRoomId()));
    }

    @PostMapping("/choice-helper")
    public ResponseEntity<ApiResponse<Long>> makeRoomWithHelper(
        @RequestBody RoomCreateRequest roomCreateRequest) {
        Long roomId = matchService.makeRoom(roomCreateRequest);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(new ApiResponse<>(SuccessCode.INSERT_SUCCESS, roomId));
    }
}
