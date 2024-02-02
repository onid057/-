package com.a407.back.controller;

import static org.assertj.core.api.Assertions.assertThat;

import com.a407.back.BackendApplication;
import com.a407.back.domain.Grade;
import com.a407.back.domain.Room;
import com.a407.back.domain.User;
import com.a407.back.domain.User.Gender;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.match.RoomCreateRequest;
import com.a407.back.dto.zipsa.PublicRoomNotificationRequest;
import com.a407.back.dto.zipsa.ReportCreateRequest;
import com.a407.back.model.service.MatchService;
import com.a407.back.model.service.NotificationService;
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
    EntityManager em;

    @Autowired
    NotificationService notificationService;


    private Long userId;
    private Long roomId;
    private Long zipsaId;

    @BeforeEach
    void beforeEach() {
        // 사용자 생성
        User user = User.builder().email("user@abc.com").name("user").password("user")
            .birth(Timestamp.valueOf("2024-01-01 01:01:01")).gender(Gender.MAN).address("서울시")
            .latitude(36.5).longitude(127.5).isAdmin(false).isAffiliated(false).isBlocked(false)
            .isCertificated(false).build();

        // 집사를 할 사용자 생성
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
            .gradeId(grade).isWorked(true).kindnessAverage(0D).skillAverage(0D)
            .rewindAverage(0D).replyAverage(0D).replyCount(0).preferTag("임시 태그").build();
        em.persist(zipsa);
        assertThat(zipsaService.findByZipsaId(zipsaId).getDescription()).isEqualTo("설명");

        List<Long> list = new ArrayList<>();
        list.add(1L);
        RoomCreateRequest roomCreateRequest = new RoomCreateRequest(userId, 1L, "제목", "1", "장소", 12,
            Timestamp.valueOf("2024-01-01 01:01:01"), Timestamp.valueOf("2024-01-01 01:01:01"),
            Timestamp.valueOf("2024-01-01 01:01:01"), 15000, list);
        roomId = matchService.makeFilterRoom(roomCreateRequest);
    }

    @Test
    @DisplayName("정기 보고 추가")
    void makeReport() {
        ReportCreateRequest reportCreateRequest = new ReportCreateRequest(roomId,
            "https://www.flaticon.com/kr/free-icon-font/phone-call_5070407", "내용");
        zipsaService.makeReport(reportCreateRequest);
        ReportCreateRequest reportCreateRequestTwo = new ReportCreateRequest(roomId,
            "https://www.flaticon.com/kr/free-icon-font/phone-call_5070407", "내용2");
        zipsaService.makeReport(reportCreateRequestTwo);
        assertThat(zipsaService.findReportByRoomIdList(roomId)).hasSize(2);
        assertThat(zipsaService.findReportByRoomIdList(roomId).get(0)
            .getProcessContent()).isEqualTo("내용");
    }

    @Test
    @DisplayName("정기 보고 조회")
    void findReportByRoomIdList() {
        ReportCreateRequest reportCreateRequest = new ReportCreateRequest(roomId,
            "https://www.flaticon.com/kr/free-icon-font/phone-call_5070407", "내용");
        zipsaService.makeReport(reportCreateRequest);
        ReportCreateRequest reportCreateRequestTwo = new ReportCreateRequest(roomId,
            "https://www.flaticon.com/kr/free-icon-font/phone-call_5070407", "내용2");
        zipsaService.makeReport(reportCreateRequestTwo);
        assertThat(zipsaService.findReportByRoomIdList(roomId)).hasSize(2);
    }

    @Test
    @DisplayName("집사 상세 정보 조회")
    void findZipsaAndReviewFindByZipsaId() {
        ReportCreateRequest reportCreateRequest = new ReportCreateRequest(roomId,
            "https://www.flaticon.com/kr/free-icon-font/phone-call_5070407", "내용");
        zipsaService.makeReport(reportCreateRequest);
        ReportCreateRequest reportCreateRequestTwo = new ReportCreateRequest(roomId,
            "https://www.flaticon.com/kr/free-icon-font/phone-call_5070407", "내용2");
        zipsaService.makeReport(reportCreateRequestTwo);
        assertThat(zipsaService.findReportByRoomIdList(roomId)).hasSize(2);
        assertThat(zipsaService.findZipsaDetailFindByZipsaId(zipsaId).getName()).isEqualTo(
            "zipsa");
    }

    @Test
    @DisplayName("집사 예약 내역 확인")
    void getUserRecordList() {
        Zipsa zipsa = zipsaService.findByZipsaId(
            zipsaService.findByZipsaId(zipsaId).getZipsaId().getUserId());
        roomService.changeRoomZipsa(zipsa, roomId);
        em.flush();
        em.clear();

        assertThat(zipsaService.getZipsaReservationList(zipsaId)).isEmpty();

        roomService.changeRoomStatus(roomId, "BEFORE");
        em.flush();
        em.clear();

        assertThat(zipsaService.getZipsaReservationList(zipsaId)).hasSize(1);

        assertThat(
            roomService.findByRoomId(roomId).getZipsaId().getZipsaId().getUserId()).isEqualTo(
            zipsa.getZipsaId().getUserId());
    }

    @Test
    @DisplayName("집사 이용 내역 확인")
    void getZipsaReservationList() {
        Zipsa zipsa = zipsaService.findByZipsaId(
            zipsaService.findByZipsaId(zipsaId).getZipsaId().getUserId());
        roomService.changeRoomZipsa(zipsa, roomId);
        em.flush();
        em.clear();

        assertThat(zipsaService.getZipsaRecordList(zipsaId)).isEmpty();

        roomService.changeRoomStatus(roomId, "END");
        em.flush();
        em.clear();

        assertThat(zipsaService.getZipsaRecordList(zipsaId)).hasSize(1);
    }


    @Test
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