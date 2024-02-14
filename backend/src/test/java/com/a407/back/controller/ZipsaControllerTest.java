package com.a407.back.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.awaitility.Awaitility.await;

import com.a407.back.BackendApplication;
import com.a407.back.domain.Grade;
import com.a407.back.domain.MajorCategory;
import com.a407.back.domain.Room;
import com.a407.back.domain.Room.Process;
import com.a407.back.domain.SubCategory;
import com.a407.back.domain.User;
import com.a407.back.domain.User.Gender;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.match.RoomCreateRequest;
import com.a407.back.dto.review.ReviewCreateRequest;
import com.a407.back.dto.user.UserCreateRequest;
import com.a407.back.dto.zipsa.PublicRoomNotificationRequest;
import com.a407.back.dto.zipsa.ZipsaInfoResponse;
import com.a407.back.dto.zipsa.ZipsaReservationInfoResponse;
import com.a407.back.model.service.MatchService;
import com.a407.back.model.service.NotificationService;
import com.a407.back.model.service.ReviewService;
import com.a407.back.model.service.RoomService;
import com.a407.back.model.service.UserService;
import com.a407.back.model.service.ZipsaService;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import org.awaitility.Durations;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ContextConfiguration;

@SpringBootTest
@ContextConfiguration(classes = BackendApplication.class)
class ZipsaControllerTest {

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

    @Autowired
    NotificationService notificationService;


    private Long userId;
    private Long roomId;
    private Long zipsaId;

    @BeforeEach
    void setup() {
        // 사용자 생성
        UserCreateRequest user = new UserCreateRequest("user@abc.com", "user", "user",
            Date.valueOf(LocalDate.of(2024, 1, 1)), Gender.MAN, "서울시", 36.5, 127.5);

        // 집사를 할 사용자 생성
        UserCreateRequest zipsaUser = new UserCreateRequest("zipsa@abc.com", "zipsa", "zipsa",
            Date.valueOf(LocalDate.of(2024, 1, 1)), Gender.MAN, "서울시", 36.5, 127.5);

        Grade grade = new Grade("임시 등급", 10);
        em.persist(grade);
        em.flush();
        em.clear();
        userId = userService.makeUser(user);
        zipsaId = userService.makeUser(zipsaUser);
        assertThat(userService.findByUserId(userId)).isEqualTo(userService.findByUserId(userId));
        assertThat(userService.findByUserId(zipsaId)).isEqualTo(userService.findByUserId(zipsaId));
        Zipsa zipsa = Zipsa.builder().zipsaId(userService.findByUserId(zipsaId)).account("계좌")
            .description("설명").gradeId(grade).isWorked(true).kindnessAverage(0D).skillAverage(0D)
            .rewindAverage(0D).replyAverage(0D).replyCount(0).preferTag("임시 태그").build();
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
    @Transactional
    @DisplayName("정기 보고 추가")
    void makeReport() throws IOException {
        MockMultipartFile image = new MockMultipartFile("name", "origin.jpg", "image/jpeg",
            new FileInputStream(
                Objects.requireNonNull(getClass().getResource("/img/test.jpg")).getFile()));

        zipsaService.makeReport(roomId, image, "내용");

        zipsaService.makeReport(roomId, image, "내용2");

        assertThat(zipsaService.findReportByRoomIdList(roomId).getReportList()).hasSize(2);
    }

    @Test
    @Transactional
    @DisplayName("정기 보고 조회")
    void findReportByRoomIdList() throws IOException {
        MockMultipartFile image = new MockMultipartFile("name", "origin.jpg", "image/jpeg",
            new FileInputStream(
                Objects.requireNonNull(getClass().getResource("/img/test.jpg")).getFile()));

        zipsaService.makeReport(roomId, image, "내용");
        zipsaService.makeReport(roomId, image, "내용2");
        assertThat(zipsaService.findReportByRoomIdList(roomId).getReportList()).hasSize(2);
    }

    @Test
    @Transactional
    @DisplayName("집사 정보 조회")
    void findZipsaFindByZipsaId() {
        ZipsaInfoResponse zipsaFindByZipsaId = zipsaService.findZipsaFindByZipsaId(zipsaId);
        assertThat(zipsaFindByZipsaId.getName()).isEqualTo("zipsa");
    }

    @Test
    @Transactional
    @DisplayName("집사 상세 정보 조회")
    void findZipsaDetailFindByZipsaId() {
        ReviewCreateRequest reviewCreateRequest = new ReviewCreateRequest(roomId, "내용", 10, 10, 10);
        ReviewCreateRequest reviewCreateRequestTwo = new ReviewCreateRequest(roomId, "내용2", 20, 20,
            20);

        reviewService.makeReview(reviewCreateRequest);
        em.flush();
        em.clear();
        reviewService.makeReview(reviewCreateRequestTwo);
        em.flush();
        em.clear();
        assertThat(
            zipsaService.findZipsaDetailFindByZipsaId(zipsaId).getKindnessAverage()).isEqualTo(15);
    }

    @Test
    @Transactional
    @DisplayName("집사 리뷰 조회")
    void findsZipsaReviewFindByZipsaId() {
        ReviewCreateRequest reviewCreateRequest = new ReviewCreateRequest(roomId, "내용", 10, 10, 10);
        reviewService.makeReview(reviewCreateRequest);
        em.flush();
        em.clear();
        await().pollDelay(Durations.ONE_SECOND).until(() -> true);
        ReviewCreateRequest reviewCreateRequestTwo = new ReviewCreateRequest(roomId, "내용2", 20, 20,
            20);
        reviewService.makeReview(reviewCreateRequestTwo);
        em.flush();
        em.clear();
        assertThat(zipsaService.findsZipsaReviewFindByZipsaId(zipsaId)).hasSize(2);
        assertThat(
            zipsaService.findsZipsaReviewFindByZipsaId(zipsaId).get(0).getContent()).isEqualTo(
            "내용2");
    }

    @Test
    @Transactional
    @DisplayName("집사 예약 내역 확인")
    void getUserReservationList() {
        Zipsa zipsa = zipsaService.findByZipsaId(
            zipsaService.findByZipsaId(zipsaId).getZipsaId().getUserId());
        User user = userService.findByUserId(userId);
        // 대분류 카테고리 생성
        MajorCategory newMajorCategory = MajorCategory.builder().name("동행").build();
        em.persist(newMajorCategory);
        Long majorCategoryId = newMajorCategory.getMajorCategoryId();
        // 대분류 카테고리 가져오기
        MajorCategory majorCategory = em.find(MajorCategory.class, majorCategoryId);
        // 소분류 카테고리 생성
        SubCategory newSubCategory = SubCategory.builder().majorCategoryId(majorCategory)
            .name("병원 동행").build();
        em.persist(newSubCategory);

        Room room = Room.builder().userId(user).zipsaId(zipsa).subCategoryId(newSubCategory)
            .title("title").content("content").place("place").estimateDuration(2).roomCreatedAt(
                Timestamp.valueOf(LocalDateTime.now())).isReported(false).isPublic(false)
            .expectationPay(15000).expectationStartedAt(Timestamp.valueOf(LocalDateTime.now()))
            .expectationEndedAt(Timestamp.valueOf(LocalDateTime.now())).isComplained(false)
            .isReviewed(false).status(
                Process.CREATE).build();
        em.persist(room);
        roomService.changeRoomStatus(room.getRoomId(), "BEFORE");
        em.flush();
        em.clear();
        ZipsaReservationInfoResponse zipsaReservationInfoResponse = zipsaService.getZipsaReservationInfo(
            room.getRoomId());
        assertThat(zipsaReservationInfoResponse.getName()).isEqualTo("user");


        assertThat(userService.getUserReservationList(zipsaId)).hasSize(1);

        assertThat(
            roomService.findByRoomId(roomId).getZipsaId().getZipsaId().getUserId()).isEqualTo(
            zipsa.getZipsaId().getUserId());
    }

    @Test
    @Transactional
    @DisplayName("집사 이용 내역 확인")
    void getZipsaRecordList() {
        Zipsa zipsa = zipsaService.findByZipsaId(
            zipsaService.findByZipsaId(zipsaId).getZipsaId().getUserId());
        roomService.changeRoomZipsa(zipsa, roomId);
        em.flush();
        em.clear();

        User user = userService.findByUserId(userId);
        // 대분류 카테고리 생성
        MajorCategory newMajorCategory = MajorCategory.builder().name("동행").build();
        em.persist(newMajorCategory);
        Long majorCategoryId = newMajorCategory.getMajorCategoryId();
        // 대분류 카테고리 가져오기
        MajorCategory majorCategory = em.find(MajorCategory.class, majorCategoryId);
        // 소분류 카테고리 생성
        SubCategory newSubCategory = SubCategory.builder().majorCategoryId(majorCategory)
            .name("병원 동행").build();
        em.persist(newSubCategory);

        Room room = Room.builder().userId(user).zipsaId(zipsa).subCategoryId(newSubCategory)
            .title("title").content("content").place("place").estimateDuration(2).roomCreatedAt(
                Timestamp.valueOf(LocalDateTime.now())).isReported(false).isPublic(false)
            .expectationPay(15000).expectationStartedAt(Timestamp.valueOf(LocalDateTime.now()))
            .expectationEndedAt(Timestamp.valueOf(LocalDateTime.now())).isComplained(false)
            .isReviewed(false).status(
                Process.END).build();
        em.persist(room);

        assertThat(userService.getUserRecordList(zipsaId)).hasSize(1);
    }


    @Test
    @Transactional
    @DisplayName("알림")
    void makePublicRoomNotification() {
        roomService.changeRoomZipsa(zipsaService.findByZipsaId(zipsaId), roomId);
        em.flush();
        em.clear();

        Room room = em.find(Room.class, roomId);
        assertThat(room.getNotificationCount()).isEqualTo(1);
        PublicRoomNotificationRequest publicRoomNotificationRequest = new PublicRoomNotificationRequest(
            roomId, zipsaId);

        zipsaService.makePublicRoomNotification(publicRoomNotificationRequest);
        em.flush();
        em.clear();
        room = em.find(Room.class, roomId);
        assertThat(room.getNotificationCount()).isEqualTo(2);
    }


}