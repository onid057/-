package com.a407.back.controller;

import static org.assertj.core.api.Assertions.assertThat;

import com.a407.back.BackendApplication;
import com.a407.back.domain.Grade;
import com.a407.back.domain.User;
import com.a407.back.domain.User.Gender;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.Match.RoomCreateRequest;
import com.a407.back.dto.Zipsa.ReportCreateRequest;
import com.a407.back.model.service.MatchService;
import com.a407.back.model.service.RoomService;
import com.a407.back.model.service.UserService;
import com.a407.back.model.service.ZipsaService;
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
class ZipsaControllerTest {

    @Autowired
    UserService userService;

    @Autowired
    ZipsaService zipsaService;

    @Autowired
    RoomService roomService;

    @Autowired
    MatchService matchService;


    final Logger logger = LoggerFactory.getLogger(this.getClass());


    @BeforeEach
    void beforeEach() {
        // 여기에서 필요한 데이터들이 어떤게 있는지 생각을 해보고 값을 세팅 해주자
        // 방의 정보와 사용자의 정보, 집사의 정보가 필요하다
        User user = User.builder().email("user@abc.com").name("user").password("user").birth(
                Timestamp.valueOf("2024-01-01 01:01:01")).gender(Gender.MAN).address("서울시")
            .latitude(36.5).longitude(127.5).isAdmin(false).isAffiliated(false).isBlocked(false)
            .isCertificated(false).build();

        User zipsaUser = User.builder().email("zipsa@abc.com").name("zipsa").password("zipsa")
            .birth(
                Timestamp.valueOf("2024-01-01 01:01:01")).gender(Gender.MAN).address("서울시")
            .latitude(36.5).longitude(127.5).isAdmin(false).isAffiliated(false).isBlocked(false)
            .isCertificated(false).build();

        Zipsa zipsa = Zipsa.builder().zipsaId(zipsaUser).account("계좌").description("설명")
            .gradeId(new Grade("임시 등급", 5000)).isWorked(true).kindnessAverage(0D).skillAverage(0D)
            .rewindAverage(0D).replyAverage(0D).replyCount(0).preferTag("임시 태그").build();

        List<Long> list = new ArrayList<>();
        list.add(1L);
        RoomCreateRequest roomCreateRequest = new RoomCreateRequest(1L, 1L, "제목", "1", "장소", 12,
            Timestamp.valueOf("2024-01-01 01:01:01"), Timestamp.valueOf("2024-01-01 01:01:01"),
            Timestamp.valueOf("2024-01-01 01:01:01"), 15000, list);

        matchService.makeFilterRoom(roomCreateRequest);

        userService.save(user);
        userService.save(zipsaUser);
    }

    @Test
    @DisplayName("정기 보고 추가 + 조회")
    void reportAdd() {
        List<Long> list = new ArrayList<>();
        list.add(1L);
        RoomCreateRequest roomCreateRequest = new RoomCreateRequest(1L, 1L, "제목", "1", "장소", 12,
            Timestamp.valueOf("2024-01-01 01:01:01"), Timestamp.valueOf("2024-01-01 01:01:01"),
            Timestamp.valueOf("2024-01-01 01:01:01"), 15000, list);

        Long roomId=matchService.makeFilterRoom(roomCreateRequest);

        ReportCreateRequest reportCreateRequest = new ReportCreateRequest(
            roomId, "https://www.flaticon.com/kr/free-icon-font/phone-call_5070407", "내용");
        zipsaService.saveReport(reportCreateRequest);
        assertThat(
            zipsaService.reportFindByRoomId(roomId).getList().get(0).getProcessContent()).isEqualTo(
            "내용");
        logger.info("생성, 조회 성공");
    }

    @Test
    @DisplayName("집사 상세 정보 조회")
    void zipsaDetailInfo() {
        // 집사를 추가하는 api는 아직 작성되지 않아서 dump로 제공된 집사의 정보를 사용
        assertThat(zipsaService.zipsaAndReviewFindByZipsaId(3L).getName()).isEqualTo("user3");
        logger.info("집사 상세 정보(리뷰 포함)");
    }

    @Test
    @DisplayName("집사 이용 내역 확인")
    void getUserRecords() {

    }

    @Test
    @DisplayName("집사 예약, 진행 내역 확인")
    void getZipsaReservations() {

    }

    @Test
    @DisplayName("알림")
    void makePublicRoomNotification() {

    }


}