package com.a407.back.model.repo;

import com.a407.back.domain.Review;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.Review.ReviewListResponse;
import java.util.List;

public interface ReviewRepository {

    void makeReview(Review review);

    Long findCountByZipsaId(Long zipsaId);

    List<ReviewListResponse> findReviewsByUserId(Long userId);

    void deleteReview(Long reviewId);

    Zipsa findZipsaByReviewId(Long reviewId);

    Review findReviewByReviewId(Long reviewId);
}
