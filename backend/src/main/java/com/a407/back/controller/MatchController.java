package com.a407.back.controller;

import com.a407.back.config.constants.SuccessCode;
import com.a407.back.dto.Match.MatchSearchRequest;
import com.a407.back.dto.Match.MatchSearchResponse;
import com.a407.back.dto.Match.RoomCreateRequest;
import com.a407.back.dto.util.ApiResponse;
import com.a407.back.model.service.MatchService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/filter")
    public ResponseEntity<ApiResponse<List<MatchSearchResponse>>> getFilteredZipsaList(
        @RequestParam("majorCategoryId") Long majorCategoryId,
        @RequestParam("genderStr") String genderStr, @RequestParam("age") String age,
        @RequestParam("grade") String grade, @RequestParam("scoreAverage") String scoreAverage) {
        List<MatchSearchResponse> matchSearchResponses = matchService.getFilteredZipsaList(
            new MatchSearchRequest(majorCategoryId, genderStr, age, grade, scoreAverage));
        ApiResponse<List<MatchSearchResponse>> response = new ApiResponse<>(
            SuccessCode.SELECT_SUCCESS, matchSearchResponses);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/choice-helper")
    public ResponseEntity<ApiResponse<Long>> makeRoomWithHelper(
        @RequestBody RoomCreateRequest roomCreateRequest) {
        Long roomId = matchService.makeFilterRoom(roomCreateRequest);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(new ApiResponse<>(SuccessCode.INSERT_SUCCESS, roomId));
    }

    @GetMapping("/{roomId}/start")
    public ResponseEntity<ApiResponse<Long>> changeMatchStartedAt(
        @PathVariable("roomId") Long roomId) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.INSERT_SUCCESS,
                matchService.changeMatchStartedAt(roomId)));
    }

    @GetMapping("/{roomId}/end")
    public ResponseEntity<ApiResponse<Long>> changeMatchEndedAt(
        @PathVariable("roomId") Long roomId) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.INSERT_SUCCESS,
                matchService.changeMatchEndedAt(roomId)));
    }
}
