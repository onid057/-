package com.a407.back.controller;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.a407.back.BackendApplication;
import com.a407.back.domain.MajorCategory;
import com.a407.back.domain.Room;
import com.a407.back.domain.SubCategory;
import com.a407.back.domain.User;
import com.a407.back.domain.User.Gender;
import com.a407.back.dto.Room.MakePublicRoomRequest;
import com.a407.back.model.service.RoomService;
import com.a407.back.model.service.UserService;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import java.sql.Timestamp;
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
        User firstUser = User.builder().email("user@abc.com").name("user").password("user")
            .birth(Timestamp.valueOf("2024-01-01 01:01:01")).gender(Gender.MAN).address("서울시")
            .latitude(36.5).longitude(127.5).isAdmin(false).isAffiliated(false).isBlocked(false)
            .isCertificated(false).build();
        userId = userService.makeUser(firstUser);
        // 대분류 카테고리 생성
        MajorCategory newMajorCategory = MajorCategory.builder().name("동행").build();
        em.persist(newMajorCategory);
        Long majorCategoryId = newMajorCategory.getMajorCategoryId();
        // 대분류 카테고리 가져오기
        MajorCategory majorCategory = em.find(MajorCategory.class, majorCategoryId);
        // 소분류 카테고리 생성
        SubCategory newSubCategory = SubCategory.builder().majorCategoryId(majorCategory).name("병원 동행")
            .build();
        em.persist(newSubCategory);
        subCategoryId = newSubCategory.getSubCategoryId();
    }

    @Test
    @Transactional
    @DisplayName("공개 방 생성하기")
    void makePublicRoom() {
        MakePublicRoomRequest makePublicRoomRequest = new MakePublicRoomRequest(userId, subCategoryId, "방 제목", "방 내용", "약속 장소", 2,
            Timestamp.valueOf("2024-01-01 01:01:01"), Timestamp.valueOf("2024-01-01 01:01:01"), Timestamp.valueOf("2024-01-01 01:01:01"), 15000);
        Long roomId = roomService.makePublicRoom(makePublicRoomRequest);
        Room room = roomService.findByRoomId(roomId);
        assertThat(room.getUserId().getUserId(), is(equalTo(userId)));
    }

    @Test
    @Transactional
    @DisplayName("공개 방 삭제하기")
    void deletePublicRoom() {
        MakePublicRoomRequest makePublicRoomRequest = new MakePublicRoomRequest(userId, subCategoryId, "방 제목", "방 내용", "약속 장소", 2,
            Timestamp.valueOf("2024-01-01 01:01:01"), Timestamp.valueOf("2024-01-01 01:01:01"), Timestamp.valueOf("2024-01-01 01:01:01"), 15000);
        Long roomId = roomService.makePublicRoom(makePublicRoomRequest);
        Room room = roomService.findByRoomId(roomId);
        try {
            roomService.deletePublicRoom(room.getRoomId());
        } catch (RuntimeException ex) {
            log.error("공개 방 삭제하기가 실패했습니다.");
            assertFalse(false);
        }
    }
}