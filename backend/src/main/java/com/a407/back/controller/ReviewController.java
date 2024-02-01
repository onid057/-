package com.a407.back.controller;

import com.a407.back.config.constants.SuccessCode;
import com.a407.back.dto.review.ReviewCreateRequest;
import com.a407.back.dto.review.ReviewListResponse;
import com.a407.back.dto.util.ApiResponse;
import com.a407.back.model.service.ReviewService;
import java.util.List;
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
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<String> makeReview(
        @RequestBody ReviewCreateRequest reviewCreateRequest) {
        reviewService.makeReview(reviewCreateRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body("리뷰 작성 성공");
    }

    @GetMapping("/{userId}")
    public ApiResponse<List<ReviewListResponse>> findReviewsByUserId(@PathVariable Long userId) {
        return new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
            reviewService.findReviewsByUserId(userId));
    }

    @DeleteMapping("/{reviewId}")
    public ApiResponse<String> deleteReview(@PathVariable Long reviewId) {
        reviewService.deleteReview(reviewId);
        return new ApiResponse<>(SuccessCode.DELETE_SUCCESS, "리뷰 삭제 성공");
    }


}
