package com.a407.back.controller;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

import com.a407.back.BackendApplication;
import com.a407.back.domain.Grade;
import com.a407.back.domain.MajorCategory;
import com.a407.back.domain.Notification;
import com.a407.back.domain.Notification.Status;
import com.a407.back.domain.Notification.Type;
import com.a407.back.domain.Room;
import com.a407.back.domain.Room.Process;
import com.a407.back.domain.SubCategory;
import com.a407.back.domain.User;
import com.a407.back.domain.User.Gender;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.user.UserNotificationResponse;
import com.a407.back.dto.user.ZipsaNotificationResponse;
import com.a407.back.model.service.NotificationService;
import com.a407.back.model.service.RoomService;
import com.a407.back.model.service.UserService;
import com.a407.back.model.service.ZipsaService;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import java.sql.Timestamp;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

@SpringBootTest
@ContextConfiguration(classes = BackendApplication.class)
@Transactional
class NotificationControllerTest {

    @Autowired
    UserService userService;

    @Autowired
    ZipsaService zipsaService;

    @Autowired
    NotificationService notificationService;

    @Autowired
    RoomService roomService;

    @Autowired
    EntityManager em;

    @Autowired
    JPAQueryFactory query;

    private Long userId;

    private Long zipsaId;

    private Room room;

    @BeforeEach
    void setup() {
        // 사용자 생성
        User user = User.builder().email("user@abc.com").name("user").password("user")
            .birth(Timestamp.valueOf("2024-01-01 01:01:01")).gender(Gender.MAN).address("서울시")
            .latitude(36.5).longitude(127.5).isAdmin(false).isAffiliated(false).isBlocked(false)
            .isCertificated(false).build();
        userId = userService.makeUser(user);
        User user1 = User.builder().email("user1@abc.com").name("user1").password("user")
            .birth(Timestamp.valueOf("2024-01-01 01:01:01")).gender(Gender.MAN).address("서울시")
            .latitude(36.5).longitude(127.5).isAdmin(false).isAffiliated(false).isBlocked(false)
            .isCertificated(false).build();
        Long userId1 = userService.makeUser(user1);
        User zipsaUser = userService.findByUserId(userId1);
        // grade 생성
        Grade grade = Grade.builder().name("APPRENTICE").salary(3000).build();
        em.persist(grade);
        Long gradeId = grade.getGradeId();
        // 대분류 카테고리 생성
        MajorCategory majorCategory = MajorCategory.builder().name("동행").build();
        em.persist(majorCategory);
        Long majorCategoryId = majorCategory.getMajorCategoryId();
        // 대분류 카테고리 가져오기
        MajorCategory newMajorCategory = em.find(MajorCategory.class, majorCategoryId);
        // 소분류 카테고리 생성
        SubCategory subCategory = SubCategory.builder().majorCategoryId(majorCategory).name("병원 동행")
            .build();
        em.persist(subCategory);
        Long subCategoryId = subCategory.getSubCategoryId();
        // 소분류 카테고리 가져오기
        SubCategory newSubCategory = em.find(SubCategory.class, subCategoryId);

        // 집사 생성
        Zipsa newZipsa = Zipsa.builder().zipsaId(zipsaUser).account("111").description("Asd")
            .gradeId(grade)
            .isWorked(true).kindnessAverage(1.0).replyAverage(1.0).rewindAverage(1.0)
            .skillAverage(1.0)
            .serviceCount(0).preferTag("abc").replyCount(0).build();
        em.persist(newZipsa);
        zipsaId = newZipsa.getZipsaId().getUserId();
        // 집사 가져오기
        Zipsa zipsa = zipsaService.findByZipsaId(zipsaId);

        // 방 만들기
        Room newRoom = Room.builder().userId(user).subCategoryId(subCategory).title("title")
            .content("content").place("place").estimateDuration(2)
            .expectationStartedAt(Timestamp.valueOf("2024-01-01 01:01:01"))
            .expectationEndedAt(Timestamp.valueOf("2024-01-01 01:01:01"))
            .roomCreatedAt(Timestamp.valueOf("2024-01-01 01:01:01")).expectationPay(15000)
            .notificationCount(1).isComplained(false).isPublic(false).isReported(false)
            .isReviewed(false).status(
                Process.CREATE).build();
        em.persist(newRoom);
        Long roomId = newRoom.getRoomId();
        room = roomService.findByRoomId(roomId);
    }

    @Test
    @DisplayName("고객이 자신의 알림 조회 테스트")
    void findUserNotificationDetail() {
        Notification userNotification = Notification.builder().sendId(zipsaId).receiveId(userId)
            .roomId(room).type(
                Type.USER).status(Status.STANDBY).isRead(false).build();
        em.persist(userNotification);
        Long userNotificationId = userNotification.getNotificationId();
        UserNotificationResponse userNotificationResponse = notificationService.findUserNotificationDetail(
            userNotificationId);
        assertThat(userNotificationResponse.getZipsaName(), is(equalTo("user1")));
    }

    @Test
    @DisplayName("집사가 자신의 알림 조회 테스트")
    void findZipsaNotificationDetail() {
        Notification zipsaNotification = Notification.builder().sendId(userId).receiveId(zipsaId)
            .roomId(room).type(
                Type.ZIPSA).status(Status.STANDBY).isRead(false).build();
        em.persist(zipsaNotification);
        Long zipsaNotificationId = zipsaNotification.getNotificationId();
        ZipsaNotificationResponse zipsaNotificationResponse = notificationService.findZipsaNotificationDetail(
            zipsaNotificationId);
        assertThat(zipsaNotificationResponse.getUserName(), is(equalTo("user")));
    }

    @Test
    @DisplayName("알림 거절 테스트")
    void changeNotificationToReject() {
        Notification zipsaNotification = Notification.builder().sendId(userId).receiveId(zipsaId)
            .roomId(room).type(
                Type.ZIPSA).status(Status.STANDBY).isRead(false).build();
        em.persist(zipsaNotification);
        Long zipsaNotificationId = zipsaNotification.getNotificationId();
        int notificationCount = notificationService.changeNotificationToReject(zipsaNotificationId);
        assertThat(notificationCount, is(equalTo(0)));
    }

    @Test
    @DisplayName("알림 수락 테스트")
    void changeRoomToMatch() {
        Notification zipsaNotification = Notification.builder().sendId(userId).receiveId(zipsaId)
            .roomId(room).type(
                Type.ZIPSA).status(Status.STANDBY).isRead(false).build();
        em.persist(zipsaNotification);
        Long zipsaNotificationId = zipsaNotification.getNotificationId();
        notificationService.changeRoomToMatch(zipsaNotificationId);
        em.flush();
        em.clear();
        Notification notification = em.find(Notification.class, zipsaNotificationId);
        assertThat(notification.getStatus(), is(equalTo(Status.ACCEPT)));
    }
}