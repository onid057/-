package com.a407.back.model.repo;

import com.a407.back.domain.Review;
import com.a407.back.dto.Review.ReviewListResponse;
import java.util.List;

public interface ReviewRepository {

    void createReview(Review review);

    Long countZipsaReview(Long zipsaId);

    List<ReviewListResponse> getReviewsByUserId(Long userId);
}
