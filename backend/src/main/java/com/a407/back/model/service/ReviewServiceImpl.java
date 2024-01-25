package com.a407.back.model.service;

import com.a407.back.config.ErrorCode;
import com.a407.back.domain.Review;
import com.a407.back.domain.Room;
import com.a407.back.dto.Review.ReviewCreateRequest;
import com.a407.back.exception.CustomException;
import com.a407.back.model.repo.ReviewRepository;
import com.a407.back.model.repo.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {


    private final ReviewRepository reviewRepository;
    private final RoomRepository roomRepository;

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
    }
}
