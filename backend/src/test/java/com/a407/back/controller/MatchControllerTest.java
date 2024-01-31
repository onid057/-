package com.a407.back.controller;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.*;

import com.a407.back.BackendApplication;
import com.a407.back.domain.Grade;
import com.a407.back.domain.MajorCategory;
import com.a407.back.domain.Room;
import com.a407.back.domain.SubCategory;
import com.a407.back.domain.User;
import com.a407.back.domain.User.Gender;
import com.a407.back.domain.Zipsa;
import com.a407.back.domain.ZipsaCategory;
import com.a407.back.dto.Match.MatchSearchRequest;
import com.a407.back.dto.Match.MatchSearchResponse;
import com.a407.back.dto.Match.RoomCreateRequest;
import com.a407.back.dto.Room.MakePublicRoomRequest;
import com.a407.back.model.service.MatchService;
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

@SpringBootTest
@ContextConfiguration(classes = BackendApplication.class)
@Transactional
class MatchControllerTest {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    MatchService matchService;

    @Autowired
    UserService userService;

    @Autowired
    ZipsaService zipsaService;

    @Autowired
    RoomService roomService;

    @Autowired
    EntityManager em;

    private MajorCategory majorCategory;

    private Grade grade;

    private User user;

    private SubCategory subCategory;

    @BeforeEach
    void setup() {
        // 사용자 생성
        User firstUser = User.builder().email("user@abc.com").name("user").password("user")
            .birth(Timestamp.valueOf("2024-01-01 01:01:01")).gender(Gender.MAN).address("서울시")
            .latitude(36.5).longitude(127.5).isAdmin(false).isAffiliated(false).isBlocked(false)
            .isCertificated(false).build();
        Long userId = userService.makeUser(firstUser);
        user = em.find(User.class, userId);
        // grade 생성
        Grade newGrade = Grade.builder().name("APPRENTICE").salary(3000).build();
        em.persist(newGrade);
        Long gradeId = newGrade.getGradeId();
        grade = em.find(Grade.class, gradeId);
        // 집사 생성
        Long zipsaId = zipsaService.makeZipsa(
            Zipsa.builder().zipsaId(user).account("111").description("Asd").gradeId(grade)
                .isWorked(true).kindnessAverage(1.0).replyAverage(1.0).rewindAverage(1.0)
                .skillAverage(1.0)
                .serviceCount(0).preferTag("abc").replyCount(0).build());
        // 집사 가져오기
        Zipsa zipsa = zipsaService.findByZipsaId(zipsaId);
        // 대분류 카테고리 생성
        MajorCategory newMajorCategory = MajorCategory.builder().name("동행").build();
        em.persist(newMajorCategory);
        Long majorCategoryId = newMajorCategory.getMajorCategoryId();
        // 대분류 카테고리 가져오기
        majorCategory = em.find(MajorCategory.class, majorCategoryId);
        // 소분류 카테고리 생성
        SubCategory newSubCategory = SubCategory.builder().majorCategoryId(majorCategory).name("병원 동행")
            .build();
        em.persist(newSubCategory);
        Long subCategoryId = newSubCategory.getSubCategoryId();
        subCategory = em.find(SubCategory.class, subCategoryId);
        // zipsa - category 생성
        ZipsaCategory zipsaCategory = ZipsaCategory.builder().majorCategoryId(majorCategory).zipsaId(zipsa).build();
        em.persist(zipsaCategory);
    }

    @Test
    @DisplayName("필터링 기반 검색 구현")
    void getFilteredZipsaList() {
        // 필터링 기반 탐색
        MatchSearchRequest matchSearchRequest = new MatchSearchRequest(majorCategory.getMajorCategoryId(), "MAN", "0",
            "APPRENTICE",
            "1");
        List<MatchSearchResponse> matchSearchResponses = matchService.getFilteredZipsaList(
            matchSearchRequest);
        if (!matchSearchResponses.isEmpty()) {
            logger.info(matchSearchResponses.toString());
            assertThat(matchSearchResponses.get(0).getName(), is(equalTo("user")));
        } else {
            logger.error("필터링 기반 검색 테스트를 실패했습니다.");
        }
    }

    @Test
    @DisplayName("필터링 기반 검색 후 방 만들기 구현")
    void makeRoomWithHelper() {
        // 집사1 생성
        User user1 = User.builder().email("user1@abc.com").name("user").password("user")
            .birth(Timestamp.valueOf("2024-01-01 01:01:01")).gender(Gender.MAN).address("서울시")
            .latitude(36.5).longitude(127.5).isAdmin(false).isAffiliated(false).isBlocked(false)
            .isCertificated(false).build();
        Long userId1 = userService.makeUser(user1);
        User newUser1 = userService.findByUserId(userId1);
        Long zipsaId1 = zipsaService.makeZipsa(
            Zipsa.builder().zipsaId(newUser1).account("111").description("Asd").gradeId(grade)
                .isWorked(true).kindnessAverage(1.0).replyAverage(1.0).rewindAverage(1.0)
                .skillAverage(1.0)
                .serviceCount(0).preferTag("abc").replyCount(0).build());
        Zipsa zipsa1 = zipsaService.findByZipsaId(zipsaId1);
        ZipsaCategory zipsaCategory1 = ZipsaCategory.builder().majorCategoryId(majorCategory).zipsaId(zipsa1).build();
        em.persist(zipsaCategory1);

        // 집사2 생성
        User user2 = User.builder().email("user2@abc.com").name("user").password("user")
            .birth(Timestamp.valueOf("2024-01-01 01:01:01")).gender(Gender.MAN).address("서울시")
            .latitude(36.5).longitude(127.5).isAdmin(false).isAffiliated(false).isBlocked(false)
            .isCertificated(false).build();
        Long userId2 = userService.makeUser(user2);
        User newUser2 = userService.findByUserId(userId2);
        Long zipsaId2 = zipsaService.makeZipsa(
            Zipsa.builder().zipsaId(newUser2).account("111").description("Asd").gradeId(grade)
                .isWorked(true).kindnessAverage(1.0).replyAverage(1.0).rewindAverage(1.0)
                .skillAverage(1.0)
                .serviceCount(0).preferTag("abc").replyCount(0).build());
        Zipsa zipsa2 = zipsaService.findByZipsaId(zipsaId2);
        ZipsaCategory zipsaCategory2 = ZipsaCategory.builder().majorCategoryId(majorCategory).zipsaId(zipsa2).build();
        em.persist(zipsaCategory2);

        List<Long> zipsaList = new ArrayList<>();
        zipsaList.add(zipsaId1);
        zipsaList.add(zipsaId2);

        RoomCreateRequest roomCreateRequest = new RoomCreateRequest(user.getUserId(), subCategory.getSubCategoryId(), "title",
            "content", "place", 2, Timestamp.valueOf("2024-01-01 01:01:01"),
            Timestamp.valueOf("2024-01-01 01:01:01"), Timestamp.valueOf("2024-01-01 01:01:01"),
            15000, zipsaList);
        Long roomId = matchService.makeFilterRoom(roomCreateRequest);
        Room room = roomService.findByRoomId(roomId);
        if (room != null) {
            logger.info(String.valueOf(room.getRoomId()));
            assertThat(room.getUserId().getName(), is(equalTo("user")));
        } else {
            logger.error("필터링 기반 검색 후 방 만들기 테스트를 실패했습니다.");
        }
    }

    @Test
    @DisplayName("업무 시작 버튼 구현")
    void changeMatchStartedAt() {
        // 집사1 생성
        User user1 = User.builder().email("user1@abc.com").name("user").password("user")
            .birth(Timestamp.valueOf("2024-01-01 01:01:01")).gender(Gender.MAN).address("서울시")
            .latitude(36.5).longitude(127.5).isAdmin(false).isAffiliated(false).isBlocked(false)
            .isCertificated(false).build();
        Long userId1 = userService.makeUser(user1);
        User newUser1 = userService.findByUserId(userId1);
        Long zipsaId1 = zipsaService.makeZipsa(
            Zipsa.builder().zipsaId(newUser1).account("111").description("Asd").gradeId(grade)
                .isWorked(true).kindnessAverage(1.0).replyAverage(1.0).rewindAverage(1.0)
                .skillAverage(1.0)
                .serviceCount(0).preferTag("abc").replyCount(0).build());
        Zipsa zipsa1 = zipsaService.findByZipsaId(zipsaId1);
        ZipsaCategory zipsaCategory1 = ZipsaCategory.builder().majorCategoryId(majorCategory).zipsaId(zipsa1).build();
        em.persist(zipsaCategory1);

        // 방 만들기
        Long roomId = roomService.makePublicRoom(
            new MakePublicRoomRequest(user.getUserId(), subCategory.getSubCategoryId(), "title", "content", "place", 2,
                Timestamp.valueOf("2024-01-01 01:01:01"), Timestamp.valueOf("2024-01-01 01:01:01"),
                Timestamp.valueOf("2024-01-01 01:01:01"), 15000));
        matchService.changeMatchStartedAt(roomId);
        em.flush();
        em.clear();
        Room room = roomService.findByRoomId(roomId);
        logger.info(room.toString());
        assertNotNull(room.getStartedAt());
    }

    @Test
    @DisplayName("업무 종료 버튼 구현")
    void changeMatchEndedAt() {
        // 집사1 생성
        User user1 = User.builder().email("user1@abc.com").name("user").password("user")
            .birth(Timestamp.valueOf("2024-01-01 01:01:01")).gender(Gender.MAN).address("서울시")
            .latitude(36.5).longitude(127.5).isAdmin(false).isAffiliated(false).isBlocked(false)
            .isCertificated(false).build();
        Long userId1 = userService.makeUser(user1);
        User newUser1 = userService.findByUserId(userId1);
        Long zipsaId1 = zipsaService.makeZipsa(
            Zipsa.builder().zipsaId(newUser1).account("111").description("Asd").gradeId(grade)
                .isWorked(true).kindnessAverage(1.0).replyAverage(1.0).rewindAverage(1.0)
                .skillAverage(1.0)
                .serviceCount(0).preferTag("abc").replyCount(0).build());
        Zipsa zipsa1 = zipsaService.findByZipsaId(zipsaId1);
        ZipsaCategory zipsaCategory1 = ZipsaCategory.builder().majorCategoryId(majorCategory).zipsaId(zipsa1).build();
        em.persist(zipsaCategory1);

        // 방 만들기
        Long roomId = roomService.makePublicRoom(
            new MakePublicRoomRequest(user.getUserId(), subCategory.getSubCategoryId(), "title", "content", "place", 2,
                Timestamp.valueOf("2024-01-01 01:01:01"), Timestamp.valueOf("2024-01-01 01:01:01"),
                Timestamp.valueOf("2024-01-01 01:01:01"), 15000));
        roomService.changeRoomZipsa(zipsa1, roomId);
        em.flush();
        em.clear();
        matchService.changeMatchEndedAt(roomId);
        em.flush();
        em.clear();
        Room room = roomService.findByRoomId(roomId);
        logger.info(room.toString());
        assertNotNull(room.getEndedAt());
    }
}