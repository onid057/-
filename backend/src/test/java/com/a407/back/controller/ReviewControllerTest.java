package com.a407.back.controller;

import static org.assertj.core.api.Assertions.assertThat;

import com.a407.back.BackendApplication;
import com.a407.back.domain.Grade;
import com.a407.back.domain.User;
import com.a407.back.domain.User.Gender;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.match.RoomCreateRequest;
import com.a407.back.dto.review.ReviewCreateRequest;
import com.a407.back.dto.review.ReviewListResponse;
import com.a407.back.dto.zipsa.ZipsaReviewResponse;
import com.a407.back.model.service.MatchService;
import com.a407.back.model.service.ReviewService;
import com.a407.back.model.service.RoomService;
import com.a407.back.model.service.UserService;
import com.a407.back.model.service.ZipsaService;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

@SpringBootTest
@ContextConfiguration(classes = BackendApplication.class)
@Transactional
class ReviewControllerTest {

    @Autowired
    UserService userService;

    @Autowired
    ZipsaService zipsaService;

    @Autowired
    RoomService roomService;

    @Autowired
    MatchService matchService;

    @Autowired
    ReviewService reviewService;

    @Autowired
    EntityManager em;

    Long userId;
    Long zipsaId;
    Long roomId;

    @BeforeEach
    void beforeEach() {
        User user = User.builder().email("user@abc.com").name("user").password("user")
            .birth(Timestamp.valueOf("2024-01-01 01:01:01")).gender(Gender.MAN).address("서울시")
            .latitude(36.5).longitude(127.5).isAdmin(false).isAffiliated(false).isBlocked(false)
            .isCertificated(false).build();

        User zipsaUser = User.builder().email("zipsa@abc.com").name("zipsa").password("zipsa")
            .birth(Timestamp.valueOf("2024-01-01 01:01:01")).gender(Gender.MAN).address("서울시")
            .latitude(36.5).longitude(127.5).isAdmin(false).isAffiliated(false).isBlocked(false)
            .isCertificated(false).build();

        Grade grade = new Grade("임시 등급", 10);
        em.persist(grade);
        userId = userService.makeUser(user);
        zipsaId = userService.makeUser(zipsaUser);
        assertThat(userService.findByUserId(userId)).isEqualTo(userService.findByUserId(userId));
        assertThat(userService.findByUserId(zipsaId)).isEqualTo(userService.findByUserId(zipsaId));
        Zipsa zipsa = Zipsa.builder().zipsaId(zipsaUser).account("계좌").description("설명")
            .gradeId(grade).isWorked(true).kindnessAverage(0D).skillAverage(0D).rewindAverage(0D)
            .replyAverage(0D).replyCount(0).preferTag("임시 태그").build();
        em.persist(zipsa);
        assertThat(zipsaService.findByZipsaId(zipsaId).getDescription()).isEqualTo("설명");

        List<Long> list = new ArrayList<>();
        list.add(1L);
        RoomCreateRequest roomCreateRequest = new RoomCreateRequest(userId, 1L, "제목", "1", "장소", 12,
            Timestamp.valueOf("2024-01-01 01:01:01"), Timestamp.valueOf("2024-01-01 01:01:01"),
            Timestamp.valueOf("2024-01-01 01:01:01"), 15000, list);
        roomId = matchService.makeFilterRoom(roomCreateRequest);
        roomService.changeRoomZipsa(zipsa, roomId);
        em.flush();
        em.clear();

    }

    @Test
    @DisplayName("리뷰 생성")
    void makeReview() {
        assertThat(reviewService.findReviewsByUserId(userId)).isEmpty();
        ReviewCreateRequest reviewCreateRequest = new ReviewCreateRequest(roomId, "리뷰 내용", 2, 3, 5);
        reviewService.makeReview(reviewCreateRequest);
        em.flush();
        em.clear();
        assertThat(reviewService.findReviewsByUserId(userId)).hasSize(1);
        ReviewCreateRequest reviewCreateRequestTwo = new ReviewCreateRequest(roomId, "리뷰 내용2", 8, 5,
            3);
        reviewService.makeReview(reviewCreateRequestTwo);
        em.flush();
        em.clear();
        assertThat(reviewService.findReviewsByUserId(userId)).hasSize(2);
        List<ZipsaReviewResponse> zipsaReviewResponses = zipsaService.findsZipsaReviewFindByZipsaId(
            zipsaId);
        assertThat(zipsaReviewResponses).hasSize(2);

        assertThat(
            zipsaService.findZipsaDetailFindByZipsaId(zipsaId).getKindnessAverage()).isEqualTo(5.0);
    }

    @Test
    @DisplayName("리뷰 검색")
    void findReviewsByUserId() {
        assertThat(reviewService.findReviewsByUserId(userId)).isEmpty();
        ReviewCreateRequest reviewCreateRequest = new ReviewCreateRequest(roomId, "리뷰 내용", 2, 3, 5);
        reviewService.makeReview(reviewCreateRequest);
        assertThat(reviewService.findReviewsByUserId(userId)).hasSize(1);
        ReviewCreateRequest reviewCreateRequestTwo = new ReviewCreateRequest(roomId, "리뷰 내용2", 9, 1,
            7);
        reviewService.makeReview(reviewCreateRequestTwo);
        assertThat(reviewService.findReviewsByUserId(userId)).hasSize(2);
        ReviewCreateRequest reviewCreateRequestThree = new ReviewCreateRequest(roomId, "리뷰 내용3", 5,
            9, 3);
        reviewService.makeReview(reviewCreateRequestThree);
        assertThat(reviewService.findReviewsByUserId(userId)).hasSize(3);
    }

    @Test
    @DisplayName("리뷰 삭제")
    void deleteReview() {

        assertThat(reviewService.findReviewsByUserId(userId)).isEmpty();
        ReviewCreateRequest reviewCreateRequest = new ReviewCreateRequest(roomId, "리뷰 내용", 4, 3, 5);
        reviewService.makeReview(reviewCreateRequest);
        em.flush();
        em.clear();
        assertThat(reviewService.findReviewsByUserId(userId)).hasSize(1);
        ReviewCreateRequest reviewCreateRequestTwo = new ReviewCreateRequest(roomId, "리뷰 내용2", 9, 1,
            7);
        reviewService.makeReview(reviewCreateRequestTwo);
        em.flush();
        em.clear();
        assertThat(reviewService.findReviewsByUserId(userId)).hasSize(2);
        ReviewCreateRequest reviewCreateRequestThree = new ReviewCreateRequest(roomId, "리뷰 내용3", 5,
            9, 3);
        reviewService.makeReview(reviewCreateRequestThree);
        assertThat(reviewService.findReviewsByUserId(userId)).hasSize(3);
        em.flush();
        em.clear();

        assertThat(zipsaService.findByZipsaId(zipsaId).getKindnessAverage()).isEqualTo(6);

        List<ReviewListResponse> reviewsByUserId = reviewService.findReviewsByUserId(userId);

        reviewService.deleteReview(reviewsByUserId.get(2).getReviewId());
        em.flush();
        em.clear();

        assertThat(reviewService.findReviewsByUserId(userId)).hasSize(2);
        assertThat(zipsaService.findByZipsaId(zipsaId).getKindnessAverage()).isEqualTo(6.5);
    }


}