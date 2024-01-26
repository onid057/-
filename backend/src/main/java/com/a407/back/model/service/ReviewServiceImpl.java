package com.a407.back.model.service;

import com.a407.back.config.ErrorCode;
import com.a407.back.domain.Review;
import com.a407.back.domain.Room;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.Review.ReviewCreateRequest;
import com.a407.back.exception.CustomException;
import com.a407.back.model.repo.ReviewRepository;
import com.a407.back.model.repo.RoomRepository;
import com.a407.back.model.repo.ZipsaRepository;
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
                getAverage(reviewCreateRequest.getKindnessScore(), kindnessAverage, countReview);
            skillAverage =
                getAverage(reviewCreateRequest.getKindnessScore(), skillAverage, countReview);
            rewindAverage =
                getAverage(reviewCreateRequest.getKindnessScore(), rewindAverage, countReview);
        }

        zipsaRepository.updateZipsaAverage(zipsa.getZipsaId().getUserId(), kindnessAverage,
            skillAverage, rewindAverage);
    }

    private static double getAverage(int score, Double average, Long countReview) {
        return ((average * countReview) + score) / (countReview + 1);
    }
}
