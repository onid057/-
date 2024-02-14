package com.a407.back.model.service;

import com.a407.back.dto.review.ReviewCreateRequest;
import com.a407.back.dto.review.ReviewListResponse;
import java.util.List;

public interface ReviewService {

    void makeReview(ReviewCreateRequest reviewCreateRequest);

    List<ReviewListResponse> findReviewsByUserId(Long userId);

    void deleteReview(Long reviewId);

}
