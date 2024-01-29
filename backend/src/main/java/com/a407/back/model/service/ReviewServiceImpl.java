package com.a407.back.model.service;

import com.a407.back.config.constants.ErrorCode;
import com.a407.back.config.constants.SuccessCode;
import com.a407.back.domain.Review;
import com.a407.back.domain.Room;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.Review.ReviewCreateRequest;
import com.a407.back.dto.Review.ReviewListResponse;
import com.a407.back.dto.util.ApiResponse;
import com.a407.back.exception.CustomException;
import com.a407.back.model.repo.ReviewRepository;
import com.a407.back.model.repo.RoomRepository;
import com.a407.back.model.repo.ZipsaRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    private final RoomRepository roomRepository;

    private final ZipsaRepository zipsaRepository;

    @Override
    @Transactional
    public void createReview(ReviewCreateRequest reviewCreateRequest) {
        Room room = roomRepository.findByRoomId(reviewCreateRequest.getRoomId());
        if (reviewCreateRequest.getRoomId() == null) {
            throw new CustomException(ErrorCode.INVALID_PARAMETER);
        }
        Review review = reviewCreateRequest.toEntity(room);

        reviewRepository.createReview(review);
        roomRepository.changeRoomReview(room.getRoomId());

        Zipsa zipsa = zipsaRepository.findByZipsaId(room.getZipsaId().getZipsaId().getUserId());

        Double kindnessAverage = zipsa.getKindnessAverage();
        Double skillAverage = zipsa.getSkillAverage();
        Double rewindAverage = zipsa.getRewindAverage();
        Long countReview = reviewRepository.countZipsaReview(zipsa.getZipsaId().getUserId());

        if (countReview == 0) {
            kindnessAverage = (double) reviewCreateRequest.getKindnessScore();
            skillAverage = (double) reviewCreateRequest.getSkillScore();
            rewindAverage = (double) reviewCreateRequest.getRewindScore();
        } else {
            kindnessAverage =
                getAverageSave(reviewCreateRequest.getKindnessScore(), kindnessAverage,
                    countReview);
            skillAverage =
                getAverageSave(reviewCreateRequest.getKindnessScore(), skillAverage, countReview);
            rewindAverage =
                getAverageSave(reviewCreateRequest.getKindnessScore(), rewindAverage, countReview);
        }

        zipsaRepository.updateZipsaAverage(zipsa.getZipsaId().getUserId(), kindnessAverage,
            skillAverage, rewindAverage);
    }

    @Override
    public ApiResponse<List<ReviewListResponse>> getReviewsByUserId(Long userId) {
        return new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
            reviewRepository.getReviewsByUserId(userId));
    }

    @Override
    @Transactional
    public void removeReviewByReviewId(Long reviewId) {

        // 지금 필요한 정보는 카운트된 값과 집사의 정보

        Zipsa zipsa = reviewRepository.getZipsaByReviewId(reviewId);
        Review review = reviewRepository.getReviewByReviewId(reviewId);

        Double kindnessAverage = zipsa.getKindnessAverage();
        Double skillAverage = zipsa.getSkillAverage();
        Double rewindAverage = zipsa.getRewindAverage();
        Long countReview = reviewRepository.countZipsaReview(zipsa.getZipsaId().getUserId());

        if (countReview == 1) {
            kindnessAverage = 0D;
            skillAverage = 0D;
            rewindAverage = 0D;
        } else {
            kindnessAverage =
                getAverageRemove(review.getKindnessScore(), kindnessAverage, countReview);
            skillAverage =
                getAverageRemove(review.getKindnessScore(), skillAverage, countReview);
            rewindAverage =
                getAverageRemove(review.getKindnessScore(), rewindAverage, countReview);
        }
        zipsaRepository.updateZipsaAverage(zipsa.getZipsaId().getUserId(), kindnessAverage,
            skillAverage, rewindAverage);

        reviewRepository.removeReviewByReviewId(reviewId);
    }

    private static double getAverageSave(int score, Double average, Long countReview) {
        return ((average * countReview) + score) / (countReview + 1);
    }

    private static double getAverageRemove(int score, Double average, Long countReview) {
        return ((average * countReview) - score) / (countReview - 1);
    }
}
