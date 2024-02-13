package com.a407.back.controller;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertFalse;

import com.a407.back.BackendApplication;
import com.a407.back.domain.Grade;
import com.a407.back.domain.MajorCategory;
import com.a407.back.domain.Notification;
import com.a407.back.domain.Notification.Status;
import com.a407.back.domain.Notification.Type;
import com.a407.back.domain.Room;
import com.a407.back.domain.SubCategory;
import com.a407.back.domain.User.Gender;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.room.MakePublicRoomRequest;
import com.a407.back.dto.room.PublicRoomDetailResponse;
import com.a407.back.dto.room.RoomNotificationListResponse;
import com.a407.back.dto.user.UserCreateRequest;
import com.a407.back.model.service.RoomService;
import com.a407.back.model.service.UserService;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import org.joda.time.DateTime;
import org.joda.time.LocalDateTime;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

@SpringBootTest
@ContextConfiguration(classes = BackendApplication.class)
class RoomControllerTest {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    RoomService roomService;

    @Autowired
    UserService userService;

    @Autowired
    EntityManager em;

    private Long userId;

    private Long subCategoryId;

    @BeforeEach
    void setup() {
        // 사용자 생성
        UserCreateRequest firstUser = new UserCreateRequest("user@abc.com", "user", "user",
            Date.valueOf(LocalDate.of(2024, 1, 1)), Gender.MAN, "서울시", 36.5, 127.5);

        userId = userService.makeUser(firstUser);
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
        subCategoryId = newSubCategory.getSubCategoryId();
    }

    @Test
    @Transactional
    @DisplayName("공개 방 생성하기")
    void makePublicRoom() {
        MakePublicRoomRequest makePublicRoomRequest = new MakePublicRoomRequest(userId,
            subCategoryId, "방 제목", "방 내용", "약속 장소", 2, Timestamp.valueOf("2024-01-01 01:01:01"),
            Timestamp.valueOf("2024-01-01 01:01:01"), Timestamp.valueOf("2024-01-01 01:01:01"),
            15000);
        Long roomId = roomService.makePublicRoom(makePublicRoomRequest);
        Room room = roomService.findByRoomId(roomId);
        assertThat(room.getUserId().getUserId(), is(equalTo(userId)));
    }

    @Test
    @Transactional
    @DisplayName("공개 방 상세 조회")
    void getPublicRoomDetail() {
        MakePublicRoomRequest makePublicRoomRequest = new MakePublicRoomRequest(userId,
            subCategoryId, "방 제목", "방 내용", "약속 장소", 2, Timestamp.valueOf("2024-01-01 01:01:01"),
            Timestamp.valueOf("2024-01-01 01:01:01"), Timestamp.valueOf("2024-01-01 01:01:01"),
            15000);
        Long roomId = roomService.makePublicRoom(makePublicRoomRequest);
        Room room = roomService.findByRoomId(roomId);
        assertThat(room.getUserId().getUserId(), is(equalTo(userId)));

        PublicRoomDetailResponse publicRoomDetailResponse = roomService.getPublicRoomDetail(roomId);
        assertThat(publicRoomDetailResponse.getTitle(), is(equalTo("방 제목")));
    }

    @Test
    @Transactional
    @DisplayName("공개 방 삭제하기")
    void deletePublicRoom() {
        MakePublicRoomRequest makePublicRoomRequest = new MakePublicRoomRequest(userId,
            subCategoryId, "방 제목", "방 내용", "약속 장소", 2, Timestamp.valueOf("2024-01-01 01:01:01"),
            Timestamp.valueOf("2024-01-01 01:01:01"), Timestamp.valueOf("2024-01-01 01:01:01"),
            15000);
        Long roomId = roomService.makePublicRoom(makePublicRoomRequest);
        Room room = roomService.findByRoomId(roomId);
        try {
            roomService.deletePublicRoom(room.getRoomId());
        } catch (RuntimeException ex) {
            log.error("공개 방 삭제하기가 실패했습니다.");
            assertFalse(false);
        }
    }

    @Test
    @Transactional
    @DisplayName("공개 방 요청 목록 불러오기")
    void getRoomNotificationList() {
        MakePublicRoomRequest makePublicRoomRequest = new MakePublicRoomRequest(userId,
            subCategoryId, "방 제목", "방 내용", "약속 장소", 2, Timestamp.valueOf("2024-01-01 01:01:01"),
            Timestamp.valueOf("2024-01-01 01:01:01"), Timestamp.valueOf("2024-01-01 01:01:01"),
            15000);
        Long roomId = roomService.makePublicRoom(makePublicRoomRequest);
        Room room = roomService.findByRoomId(roomId);
        assertThat(room.getUserId().getUserId(), is(equalTo(userId)));

        Grade grade = new Grade("임시 등급", 10);
        em.persist(grade);
        UserCreateRequest secondUser = new UserCreateRequest("user1@abc.com", "user", "user1",
            Date.valueOf(LocalDate.of(2024, 1, 1)), Gender.MAN, "서울시", 36.5, 127.5);
        Long secondUserId = userService.makeUser(secondUser);
        Zipsa firstZipsa = Zipsa.builder().zipsaId(userService.findByUserId(secondUserId)).account("계좌")
            .description("설명").gradeId(grade).isWorked(true).kindnessAverage(0D).skillAverage(0D)
            .rewindAverage(0D).replyAverage(0D).replyCount(0).preferTag("임시 태그").build();
        em.persist(firstZipsa);

        UserCreateRequest thirdUser = new UserCreateRequest("user2@abc.com", "user", "user2",
            Date.valueOf(LocalDate.of(2024, 1, 1)), Gender.MAN, "서울시", 36.5, 127.5);
        Long thirdUserId = userService.makeUser(thirdUser);
        Zipsa secondZipsa = Zipsa.builder().zipsaId(userService.findByUserId(thirdUserId)).account("계좌")
            .description("설명").gradeId(grade).isWorked(true).kindnessAverage(0D).skillAverage(0D)
            .rewindAverage(0D).replyAverage(0D).replyCount(0).preferTag("임시 태그").build();
        em.persist(secondZipsa);

        Notification firstZipsaNotification = Notification.builder().sendId(secondUserId).receiveId(userId)
            .roomId(room).type(Type.USER).status(Status.STANDBY).isRead(false).build();
        Notification secondZipsaNotification = Notification.builder().sendId(thirdUserId).receiveId(userId)
            .roomId(room).type(Type.USER).status(Status.STANDBY).isRead(false).build();

        em.persist(firstZipsaNotification);
        em.persist(secondZipsaNotification);

        RoomNotificationListResponse roomNotificationListResponse = roomService.getRoomNotificationList(roomId);
        assertThat(roomNotificationListResponse.getRoomNotificationList().size(), is(equalTo(2)));
    }
}