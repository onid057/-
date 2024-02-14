package com.a407.back.controller;

import static org.assertj.core.api.Assertions.assertThat;

import com.a407.back.BackendApplication;
import com.a407.back.domain.Grade;
import com.a407.back.domain.MajorCategory;
import com.a407.back.domain.Notification;
import com.a407.back.domain.Notification.Status;
import com.a407.back.domain.Notification.Type;
import com.a407.back.domain.QZipsa;
import com.a407.back.domain.SubCategory;
import com.a407.back.domain.User.Gender;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.match.RoomCreateRequest;
import com.a407.back.dto.user.UserAccountRequest;
import com.a407.back.dto.user.UserCreateRequest;
import com.a407.back.dto.user.UserNearZipsaRequest;
import com.a407.back.dto.user.UserPhoneNumberAndEmail;
import com.a407.back.dto.user.UserPhoneNumberRequest;
import com.a407.back.model.service.MatchService;
import com.a407.back.model.service.RoomService;
import com.a407.back.model.service.UserService;
import com.a407.back.model.service.ZipsaService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import java.security.NoSuchAlgorithmException;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.ContextConfiguration;

@SpringBootTest
@ContextConfiguration(classes = BackendApplication.class)
class UserControllerTest {

    @Autowired
    UserService userService;

    @Autowired
    @Qualifier("certificationRedisTemplate")
    RedisTemplate<String, String> redisTemplate;


    @Autowired
    ZipsaService zipsaService;

    @Autowired
    RoomService roomService;

    @Autowired
    MatchService matchService;

    @Autowired
    EntityManager em;

    @Autowired
    JPAQueryFactory query;


    @AfterEach
    void afterEach() {
        // redis에 저장된 모든 정보를 초기화 하는 작업을 진행
//        Objects.requireNonNull(redisTemplate.keys("*")).forEach(key -> redisTemplate.delete(key));
    }


    @Test
    @Transactional
    @DisplayName("사용자 생성")
    void makeUser() {

        UserCreateRequest userOne = new UserCreateRequest("userOne@abc.com", "userOne", "userOne",
            Date.valueOf(LocalDate.of(2024, 1, 1)) , Gender.MAN, "서울시", 36.5, 127.5);

        UserCreateRequest userTwo = new UserCreateRequest("userTwo@abc.com", "userTwo", "userTwo",
            Date.valueOf(LocalDate.of(2024, 1, 1)), Gender.MAN, "서울시", 36.5, 127.5);

        Long userOneId = userService.makeUser(userOne);
        Long userTwoId = userService.makeUser(userTwo);

        assertThat(userService.findByUserId(userOneId).getEmail()).isEqualTo(userOne.getEmail());
        assertThat(userService.findByUserId(userTwoId).getEmail()).isEqualTo(userTwo.getEmail());
    }

    @Test
    @Transactional
    @DisplayName("사용자 알림 조회")
    void getNotificationList() {
        // 사용자 생성
        UserCreateRequest user = new UserCreateRequest("user@abc.com", "user", "user",
            Date.valueOf(LocalDate.of(2024, 1, 1)), Gender.MAN, "서울시", 36.5, 127.5);

        // 집사를 할 사용자 생성
        UserCreateRequest zipsaUser = new UserCreateRequest("zipsa@abc.com", "zipsa", "zipsa",
            Date.valueOf(LocalDate.of(2024, 1, 1)), Gender.MAN, "서울시", 36.5, 127.5);

        Grade grade = new Grade("임시 등급", 10);
        em.persist(grade);
        Long userId = userService.makeUser(user);
        Long zipsaId = userService.makeUser(zipsaUser);
        assertThat(userService.findByUserId(userId)).isEqualTo(userService.findByUserId(userId));
        assertThat(userService.findByUserId(zipsaId)).isEqualTo(userService.findByUserId(zipsaId));
        Zipsa zipsa = Zipsa.builder().zipsaId(userService.findByUserId(zipsaId)).account("계좌")
            .description("설명").gradeId(grade).isWorked(false).kindnessAverage(0D).skillAverage(0D)
            .rewindAverage(0D).replyAverage(0D).replyCount(0).preferTag("임시 태그").build();
        em.persist(zipsa);
        assertThat(zipsaService.findByZipsaId(zipsaId).getDescription()).isEqualTo("설명");

        assertThat(userService.findNotificationByUserIdList(zipsaId)).isEmpty();

        List<Long> list = new ArrayList<>();
        list.add(zipsaId);
        RoomCreateRequest roomCreateRequest = new RoomCreateRequest(userId, 1L, "제목", "1", "장소", 12,
            Timestamp.valueOf("2024-01-01 01:01:01"), Timestamp.valueOf("2024-01-01 01:01:01"),
            Timestamp.valueOf("2024-01-01 01:01:01"), 15000, list);
        Long roomId = matchService.makeFilterRoom(roomCreateRequest);
        em.flush();
        em.clear();

        assertThat(userService.findNotificationByUserIdList(userId)).isEmpty();

        Notification userNotification = Notification.builder().sendId(zipsaId).receiveId(userId)
            .roomId(roomService.findByRoomId(roomId)).type(Type.USER).status(Status.STANDBY)
            .isRead(false).build();
        em.persist(userNotification);

        assertThat(userService.findNotificationByUserIdList(userId)).hasSize(1);
        assertThat(userService.findNotificationByUserIdList(userId).get(0).getRoomId()).isEqualTo(
            roomId);

    }

    @Test
    @Transactional
    @DisplayName("근처 집사 위치 조회")
    void getNearUserLocationList() {
        // 사용자 생성
        UserCreateRequest user = new UserCreateRequest("user@abc.com", "user", "user",
            Date.valueOf(LocalDate.of(2024, 1, 1)), Gender.MAN, "서울시", 50, 127.5);

        // 집사를 할 사용자 생성
        UserCreateRequest zipsaUser = new UserCreateRequest("zipsa@abc.com", "zipsa", "zipsa",
            Date.valueOf(LocalDate.of(2024, 1, 1)), Gender.MAN, "서울시", 50, 127.5);

        Grade grade = new Grade("임시 등급", 10);
        em.persist(grade);
        Long userId = userService.makeUser(user);
        Long zipsaId = userService.makeUser(zipsaUser);
        assertThat(userService.findByUserId(userId)).isEqualTo(userService.findByUserId(userId));
        assertThat(userService.findByUserId(zipsaId)).isEqualTo(userService.findByUserId(zipsaId));
        Zipsa zipsa = Zipsa.builder().zipsaId(userService.findByUserId(zipsaId)).account("계좌")
            .description("설명").gradeId(grade).isWorked(false).kindnessAverage(0D).skillAverage(0D)
            .rewindAverage(0D).replyAverage(0D).replyCount(0).preferTag("임시 태그").build();
        em.persist(zipsa);
        assertThat(zipsaService.findByZipsaId(zipsaId).getDescription()).isEqualTo("설명");

        assertThat(userService.findNearZipsaLocationList(userId)).isEmpty();

        QZipsa qZipsa = QZipsa.zipsa;
        query.update(qZipsa).set(qZipsa.isWorked, true).execute();
        em.flush();
        em.clear();

        assertThat(userService.findNearZipsaLocationList(userId)).hasSize(1);

        query.update(qZipsa).set(qZipsa.isWorked, false).execute();
        em.flush();
        em.clear();
        assertThat(userService.findNearZipsaLocationList(userId)).isEmpty();
    }


    @Test
    @Transactional
    @DisplayName("근처 집사 정보 조회")
    void getNearUserInfoList() {
        // 사용자 생성
        UserCreateRequest user = new UserCreateRequest("user@abc.com", "user", "user",
            Date.valueOf(LocalDate.of(2024, 1, 1)), Gender.MAN, "서울시", 55, 127.5);

        // 집사를 할 사용자 생성
        UserCreateRequest zipsaUser = new UserCreateRequest("zipsa@abc.com", "zipsa", "zipsa",
            Date.valueOf(LocalDate.of(2024, 1, 1)), Gender.MAN, "서울시", 55, 127.5);

        Grade grade = new Grade("임시 등급", 10);
        em.persist(grade);
        Long userId = userService.makeUser(user);
        Long zipsaId = userService.makeUser(zipsaUser);
        assertThat(userService.findByUserId(userId)).isEqualTo(userService.findByUserId(userId));
        assertThat(userService.findByUserId(zipsaId)).isEqualTo(userService.findByUserId(zipsaId));
        Zipsa zipsa = Zipsa.builder().zipsaId(userService.findByUserId(zipsaId)).account("계좌")
            .description("설명").gradeId(grade).isWorked(false).kindnessAverage(0D).skillAverage(0D)
            .rewindAverage(0D).replyAverage(0D).replyCount(0).preferTag("임시 태그").build();
        em.persist(zipsa);
        assertThat(zipsaService.findByZipsaId(zipsaId).getDescription()).isEqualTo("설명");

        assertThat(userService.findNearZipsaInfoList(
            new UserNearZipsaRequest(user.getLatitude(), user.getLongitude()))).isEmpty();

        QZipsa qZipsa = QZipsa.zipsa;
        query.update(qZipsa).set(qZipsa.isWorked, true).execute();
        em.flush();
        em.clear();

        assertThat(userService.findNearZipsaInfoList(
            new UserNearZipsaRequest(user.getLatitude(), user.getLongitude()))).hasSize(1);
        assertThat(userService.findNearZipsaInfoList(
                new UserNearZipsaRequest(user.getLatitude(), user.getLongitude())).get(0)
            .getZipsaId()).isEqualTo(zipsaId);

        query.update(qZipsa).set(qZipsa.isWorked, false).execute();
        em.flush();
        em.clear();
        assertThat(userService.findNearZipsaInfoList(
            new UserNearZipsaRequest(user.getLatitude(), user.getLongitude()))).isEmpty();
    }

    @Test
    @Transactional
    @DisplayName("사용자 이용 내역 조회")
    void getUserRecordList() {
        // 사용자 생성
        UserCreateRequest user = new UserCreateRequest("user@abc.com", "user", "user",
            Date.valueOf(LocalDate.of(2024, 1, 1)), Gender.MAN, "서울시", 36.5, 127.5);

        // 집사를 할 사용자 생성
        UserCreateRequest zipsaUser = new UserCreateRequest("zipsa@abc.com", "zipsa", "zipsa",
            Date.valueOf(LocalDate.of(2024, 1, 1)), Gender.MAN, "서울시", 36.5, 127.5);

        Grade grade = new Grade("임시 등급", 10);
        em.persist(grade);
        Long userId = userService.makeUser(user);
        Long zipsaId = userService.makeUser(zipsaUser);
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
        Long roomId = matchService.makeFilterRoom(roomCreateRequest);
        em.flush();
        em.clear();
        roomService.changeRoomZipsa(zipsa, roomId);
        em.flush();
        em.clear();
        assertThat(userService.getUserRecordList(userId)).isEmpty();

        roomService.changeRoomStatus(roomId, "END");
        em.flush();
        em.clear();
        assertThat(userService.getUserRecordList(userId)).hasSize(1);
    }

    @Test
    @Transactional
    @DisplayName("사용자 진행, 예약 내역 조회")
    void getUserReservationList() {
        // 사용자 생성
        UserCreateRequest user = new UserCreateRequest("user@abc.com", "user", "user",
            Date.valueOf(LocalDate.of(2024, 1, 1)), Gender.MAN, "서울시", 36.5, 127.5);

        // 집사를 할 사용자 생성
        UserCreateRequest zipsaUser = new UserCreateRequest("zipsa@abc.com", "zipsa", "zipsa",
            Date.valueOf(LocalDate.of(2024, 1, 1)), Gender.MAN, "서울시", 36.5, 127.5);

        Grade grade = new Grade("임시 등급", 10);
        em.persist(grade);
        Long userId = userService.makeUser(user);
        Long zipsaId = userService.makeUser(zipsaUser);
        assertThat(userService.findByUserId(userId)).isEqualTo(userService.findByUserId(userId));
        assertThat(userService.findByUserId(zipsaId)).isEqualTo(userService.findByUserId(zipsaId));
        Zipsa zipsa = Zipsa.builder().zipsaId(userService.findByUserId(zipsaId)).account("계좌")
            .description("설명").gradeId(grade).isWorked(true).kindnessAverage(0D).skillAverage(0D)
            .rewindAverage(0D).replyAverage(0D).replyCount(0).preferTag("임시 태그").build();
        em.persist(zipsa);
        assertThat(zipsaService.findByZipsaId(zipsaId).getDescription()).isEqualTo("설명");

        // 대분류 카테고리 생성
        MajorCategory newMajorCategory = MajorCategory.builder().name("동행").build();
        em.persist(newMajorCategory);
        Long majorCategoryId = newMajorCategory.getMajorCategoryId();
        // 대분류 카테고리 가져오기
        MajorCategory majorCategory = em.find(MajorCategory.class, majorCategoryId);
        // 소분류 카테고리 생성
        SubCategory newSubCategory = SubCategory.builder().majorCategoryId(majorCategory)
            .name("with").build();
        em.persist(newSubCategory);
        Long subCategoryId = newSubCategory.getSubCategoryId();

        List<Long> list = new ArrayList<>();
        list.add(1L);
        RoomCreateRequest roomCreateRequest = new RoomCreateRequest(userId, subCategoryId, "제목", "1", "장소", 12,
            Timestamp.valueOf("2024-01-01 01:01:01"), Timestamp.valueOf("2024-01-01 01:01:01"),
            Timestamp.valueOf("2024-01-01 01:01:01"), 15000, list);
        Long roomId = matchService.makeFilterRoom(roomCreateRequest);
        em.flush();
        em.clear();
        roomService.changeRoomZipsa(zipsa, roomId);
        em.flush();
        em.clear();
        assertThat(userService.getUserReservationList(userId)).isEmpty();

        roomService.changeRoomStatus(roomId, "BEFORE");
        em.flush();
        em.clear();
        assertThat(userService.getUserReservationList(userId)).hasSize(1);
        roomService.changeRoomStatus(roomId, "END");
        em.flush();
        em.clear();
        assertThat(userService.getUserReservationList(userId)).isEmpty();
    }

    @Test
    @Transactional
    @DisplayName("결제 정보 등록")
    void makeAccount() {
        // 사용자 생성
        UserCreateRequest user = new UserCreateRequest("user@abc.com", "user", "user",
            Date.valueOf(LocalDate.of(2024, 1, 1)), Gender.MAN, "서울시", 36.5, 127.5);
        Long userId = userService.makeUser(user);
        assertThat(userService.findByUserId(userId).getAccount()).isNullOrEmpty();
        UserAccountRequest userAccountRequest = new UserAccountRequest("0000-0000-0000");
        userService.makeAccount(userId, userAccountRequest);
        em.flush();
        em.clear();
        assertThat(userService.findByUserId(userId).getAccount()).isEqualTo("0000-0000-0000");
    }

    @Test
    @Transactional
    @DisplayName("마스킹 처리된 결제 정보 조회")
    void getMaskedCardNumber() {
        // 사용자 생성
        UserCreateRequest user = new UserCreateRequest("user@abc.com", "user", "user",
            Date.valueOf(LocalDate.of(2024, 1, 1)), Gender.MAN, "서울시", 36.5, 127.5);
        Long userId = userService.makeUser(user);
        assertThat(userService.findByUserId(userId).getAccount()).isNull();
        UserAccountRequest userAccountRequest = new UserAccountRequest("0000-0000-0000-0000");
        userService.makeAccount(userId, userAccountRequest);
        em.flush();
        em.clear();
        assertThat(userService.findByUserId(userId).getAccount()).isEqualTo("0000-0000-0000-0000");
        assertThat(userService.getMaskedCardNumber(userId)).isEqualTo("****-****-****-0000");
    }

    @Test
    @Transactional
    @DisplayName("결제 정보 삭제")
    void deleteAccount() {
        // 사용자 생성
        UserCreateRequest user = new UserCreateRequest("user@abc.com", "user", "user",
            Date.valueOf(LocalDate.of(2024, 1, 1)), Gender.MAN, "서울시", 36.5, 127.5);

        Long userId = userService.makeUser(user);
        assertThat(userService.findByUserId(userId).getAccount()).isNull();
        UserAccountRequest userAccountRequest = new UserAccountRequest("0000-0000-0000");
        userService.makeAccount(userId, userAccountRequest);
        em.flush();
        em.clear();
        assertThat(userService.findByUserId(userId).getAccount()).isEqualTo("0000-0000-0000");

        userService.deleteAccount(userId);
        em.flush();
        em.clear();

        assertThat(userService.findByUserId(userId).getAccount()).isNullOrEmpty();
    }

    @Test
    @Transactional
    @DisplayName("인증 번호 생성")
    void makeSendMessage() throws NoSuchAlgorithmException, JsonProcessingException {
        // 주의 해당 테스트 실행 전 userServiceImpl로 가서 makeSendMessage 에서 외부 API 사용하는 부분 주석 해주기
        UserCreateRequest user = new UserCreateRequest("user@abc.com", "user", "user",
            Date.valueOf(LocalDate.of(2024, 1, 1)), Gender.MAN, "서울시", 36.5, 127.5);
        Long userId = userService.makeUser(user);
        assertThat(redisTemplate.keys("*")).isEmpty();
        UserPhoneNumberRequest request = new UserPhoneNumberRequest("0");
        userService.makeSendMessage(request.getPhoneNumber(),
            userService.findByUserId(userId).getEmail());
        assertThat(redisTemplate.keys("*")).hasSize(1);
    }

    @Test
    @Transactional
    @DisplayName("인증 번호 입력")
    void makePhoneNumber() throws NoSuchAlgorithmException, JsonProcessingException {
        // 주의 해당 테스트 실행 전 userServiceImpl로 가서 makeSendMessage 에서 외부 API 사용하는 부분 주석 해주기
        UserCreateRequest user = new UserCreateRequest("user@abc.com", "user", "user",
            Date.valueOf(LocalDate.of(2024, 1, 1)), Gender.MAN, "서울시", 36.5, 127.5);
        Long userId = userService.makeUser(user);
        assertThat(redisTemplate.keys("*")).isEmpty();
        UserPhoneNumberRequest request = new UserPhoneNumberRequest("0");
        userService.makeSendMessage(request.getPhoneNumber(),
            userService.findByUserId(userId).getEmail());
        assertThat(redisTemplate.keys("*")).hasSize(1);
        ObjectMapper objectMapper = new ObjectMapper();
        UserPhoneNumberAndEmail userPhoneNumberAndEmail = objectMapper.readValue(
            redisTemplate.opsForValue()
                .get(Objects.requireNonNull(redisTemplate.keys("*")).stream().findFirst().get()),
            UserPhoneNumberAndEmail.class);
        assertThat(userPhoneNumberAndEmail.getEmail()).isEqualTo("user@abc.com");
    }


    @Test
    @Transactional
    @DisplayName("회원 정보 삭제")
    void deleteUser() {
        // 사용자 생성
        UserCreateRequest user = new UserCreateRequest("user@abc.com", "user", "user",
            Date.valueOf(LocalDate.of(2024, 1, 1)), Gender.MAN, "서울시", 36.5, 127.5);

        // 집사를 할 사용자 생성
        UserCreateRequest zipsaUser = new UserCreateRequest("zipsa@abc.com", "zipsa", "zipsa",
            Date.valueOf(LocalDate.of(2024, 1, 1)), Gender.MAN, "서울시", 36.5, 127.5);

        Grade grade = new Grade("임시 등급", 10);
        em.persist(grade);
        Long userId = userService.makeUser(user);
        Long zipsaId = userService.makeUser(zipsaUser);
        assertThat(userService.findByUserId(userId)).isEqualTo(userService.findByUserId(userId));
        assertThat(userService.findByUserId(zipsaId)).isEqualTo(userService.findByUserId(zipsaId));
        Zipsa zipsa = Zipsa.builder().zipsaId(userService.findByUserId(zipsaId)).account("계좌")
            .description("설명")
            .gradeId(grade).isWorked(true).kindnessAverage(0D).skillAverage(0D).rewindAverage(0D)
            .replyAverage(0D).replyCount(0).preferTag("임시 태그").build();
        em.persist(zipsa);
        assertThat(zipsaService.findByZipsaId(zipsaId).getDescription()).isEqualTo("설명");

        assertThat(userService.findByUserId(userId)).isNotNull();
        assertThat(userService.findByUserId(zipsaId)).isNotNull();

        userService.deleteUser(userId);
        userService.deleteUser(zipsaId);
        em.flush();
        em.clear();

        assertThat(userService.findByUserId(userId)).isNull();
        assertThat(userService.findByUserId(zipsaId)).isNull();
    }

}