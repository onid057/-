package com.a407.back.controller;

import com.a407.back.dto.Review.ReviewCreateRequest;
import com.a407.back.dto.Review.ReviewListResponse;
import com.a407.back.dto.util.ApiResponse;
import com.a407.back.model.service.ReviewService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> createReview(
        @RequestBody ReviewCreateRequest reviewCreateRequest) {
        reviewService.createReview(reviewCreateRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body("성공");
    }

    @GetMapping("/{userId}")
    public ApiResponse<List<ReviewListResponse>> getReviewsByUserId(@PathVariable Long userId){
        return reviewService.getReviewsByUserId(userId);
    }


}
