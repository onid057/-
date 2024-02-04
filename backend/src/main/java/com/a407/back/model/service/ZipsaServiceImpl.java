package com.a407.back.model.service;

import com.a407.back.domain.Notification;
import com.a407.back.domain.Notification.Status;
import com.a407.back.domain.Notification.Type;
import com.a407.back.domain.Report;
import com.a407.back.domain.Review;
import com.a407.back.domain.Room;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.room.PublicRoomListResponse;
import com.a407.back.dto.util.PublicRoom;
import com.a407.back.dto.zipsa.PublicRoomNotificationRequest;
import com.a407.back.dto.zipsa.ReportCreateRequest;
import com.a407.back.dto.zipsa.ReportSearchResponse;
import com.a407.back.dto.zipsa.ZipsaDetailInfoResponse;
import com.a407.back.dto.zipsa.ZipsaInfoResponse;
import com.a407.back.dto.zipsa.ZipsaRecordsResponse;
import com.a407.back.dto.zipsa.ZipsaReservationResponse;
import com.a407.back.dto.zipsa.ZipsaReviewResponse;
import com.a407.back.model.repo.NotificationRepository;
import com.a407.back.model.repo.RoomRepository;
import com.a407.back.model.repo.ZipsaRepository;
import com.querydsl.core.QueryResults;
import jakarta.transaction.Transactional;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ZipsaServiceImpl implements ZipsaService {

    private final ZipsaRepository zipsaRepository;

    private final RoomRepository roomRepository;

    private final NotificationRepository notificationRepository;

    @Override
    @Transactional
    public void makeReport(ReportCreateRequest reportCreateRequest) {
        Room room = roomRepository.findByRoomId(reportCreateRequest.getRoomId());
        Report report = reportCreateRequest.toEntity(room);
        zipsaRepository.makeReport(report);
    }

    @Override
    public List<ReportSearchResponse> findReportByRoomIdList(Long roomId) {
        List<Report> reports = zipsaRepository.findReportByRoomIdList(roomId);
        return reports.stream().map(
            report -> new ReportSearchResponse(new String(report.getProcessImage()),
                report.getProcessContent(),
                report.getCreatedAt())).toList();
    }

    @Override
    public ZipsaDetailInfoResponse findZipsaDetailFindByZipsaId(Long zipsaId) {
        Zipsa zipsa = zipsaRepository.findByZipsaId(zipsaId);
        List<String> subCategoryList = zipsaRepository.searchSubCategoryList(zipsaId);
        return ZipsaDetailInfoResponse.builder()
            .name(zipsa.getZipsaId().getName())
            .email(zipsa.getZipsaId().getEmail())
            .phoneNumber(zipsa.getZipsaId().getPhoneNumber())
            .birth(zipsa.getZipsaId().getBirth())
            .gender(zipsa.getZipsaId().getGender())
            .address(zipsa.getZipsaId().getAddress())
            .profileImage(zipsa.getZipsaId().getProfileImage() == null ? null : Arrays.toString(
                zipsa.getZipsaId().getProfileImage()))
            .latitude(zipsa.getZipsaId().getLatitude())
            .longitude(zipsa.getZipsaId().getLongitude())
            .gradeId(zipsa.getGradeId().getGradeId())
            .gradeName(zipsa.getGradeId().getName())
            .salary(zipsa.getGradeId().getSalary())
            .description(zipsa.getDescription())
            .preferTag(zipsa.getPreferTag())
            .serviceCount(zipsa.getServiceCount())
            .replyCount(zipsa.getReplyCount())
            .replyAverage(zipsa.getReplyAverage())
            .kindnessAverage(zipsa.getKindnessAverage())
            .skillAverage(zipsa.getSkillAverage())
            .rewindAverage(zipsa.getRewindAverage())
            .subCategory(subCategoryList)
            .build();
    }

    @Override
    public ZipsaInfoResponse findZipsaFindByZipsaId(Long zipsaId) {
        Zipsa zipsa = zipsaRepository.findByZipsaId(zipsaId);
        return ZipsaInfoResponse.builder()
            .name(zipsa.getZipsaId().getName())
            .gradeId(zipsa.getGradeId().getGradeId())
            .gradeName(zipsa.getGradeId().getName())
            .kindnessAverage(zipsa.getKindnessAverage())
            .skillAverage(zipsa.getSkillAverage())
            .rewindAverage(zipsa.getRewindAverage())
            .build();
    }


    @Override
    public List<ZipsaReviewResponse> findsZipsaReviewFindByZipsaId(Long zipsaId) {
        List<Review> reviews = zipsaRepository.searchReviewList(zipsaId);
        return reviews.stream().map(review -> ZipsaReviewResponse.builder()
            .userName(review.getUserId().getName())
            .profileImage(review.getUserId().getProfileImage() == null ? null
                : Arrays.toString(review.getUserId().getProfileImage()))
            .content(review.getContent())
            .kindnessScore(review.getKindnessScore())
            .skillScore(review.getSkillScore())
            .rewindScore(review.getRewindScore())
            .createdAt(review.getCreatedAt())
            .build()).toList();
    }

    @Override
    public Zipsa findByZipsaId(Long zipsaId) {
        return zipsaRepository.findByZipsaId(zipsaId);
    }

    @Override
    public List<ZipsaRecordsResponse> getZipsaRecordList(Long helperId) {
        return zipsaRepository.getZipsaRecordList(helperId).stream().map(room ->
            ZipsaRecordsResponse.builder()
                .name(room.getUserId().getName())
                .profileImage(room.getUserId().getProfileImage() == null ? null
                    : Arrays.toString(room.getUserId().getProfileImage()))
                .subCategoryName(room.getSubCategoryId().getName())
                .majorCategoryName(room.getSubCategoryId().getMajorCategoryId().getName())
                .content(room.getContent())
                .estimateDuration(room.getEstimateDuration())
                .roomCreatedAt(room.getRoomCreatedAt())
                .matchCreatedAt(room.getMatchCreatedAt())
                .isReported(room.getIsReported())
                .reportCycle(room.getReportCycle())
                .isPublic(room.getIsPublic())
                .startedAt(room.getStartedAt())
                .endedAt(room.getEndedAt())
                .expectationStartedAt(room.getExpectationStartedAt())
                .expectationEndedAt(room.getExpectationEndedAt())
                .expectationPay(room.getExpectationPay())
                .totalPay(room.getTotalPay())
                .build()
        ).toList();
    }

    @Override
    public List<ZipsaReservationResponse> getZipsaReservationList(Long zipsaId) {
        // 여기에서 적용
        return zipsaRepository.getZipsaReservationList(zipsaId).stream().map(room ->
            ZipsaReservationResponse.builder()
                .name(room.getUserId().getName())
                .profileImage(room.getUserId().getProfileImage() == null ? null
                    : Arrays.toString(room.getUserId().getProfileImage()))
                .subCategoryName(room.getSubCategoryId().getName())
                .majorCategoryName(room.getSubCategoryId().getMajorCategoryId().getName())
                .content(room.getContent())
                .estimateDuration(room.getEstimateDuration())
                .roomCreatedAt(room.getRoomCreatedAt())
                .matchCreatedAt(room.getMatchCreatedAt())
                .isReported(room.getIsReported())
                .reportCycle(room.getReportCycle())
                .isPublic(room.getIsPublic())
                .startedAt(room.getStartedAt())
                .endedAt(room.getEndedAt())
                .expectationStartedAt(room.getExpectationStartedAt())
                .expectationEndedAt(room.getExpectationEndedAt())
                .expectationPay(room.getExpectationPay())
                .build()
        ).toList();
    }

    @Override
    @Transactional
    public void makePublicRoomNotification(
        PublicRoomNotificationRequest publicRoomNotificationRequest) {
        // notification 생성
        Room room = roomRepository.findByRoomId(publicRoomNotificationRequest.getRoomId());
        Notification notification = Notification.builder()
            .sendId(publicRoomNotificationRequest.getZipsaId())
            .receiveId(room.getUserId().getUserId()).roomId(room).type(
                Type.USER).status(Status.STANDBY).isRead(false).build();
        notificationRepository.makeNotification(notification);
        // 방에 notification_count 1 증가
        roomRepository.changeNotificationCountIncrease(room.getNotificationCount(),
            publicRoomNotificationRequest.getRoomId());
    }

    @Override
    public PublicRoomListResponse getPublicRoomList(int page, int size) {
        QueryResults<Room> results = zipsaRepository.getPublicRoomList((page - 1) * size, size);
        List<PublicRoom> roomList = results.getResults().stream()
            .map(room ->
                new PublicRoom(room.getRoomId(),
                    room.getSubCategoryId().getSubCategoryId(), room.getTitle(), room.getContent(),
                    room.getPlace(), room.getEstimateDuration(), room.getRoomCreatedAt(),
                    room.getExpectationStartedAt(), room.getExpectationEndedAt(),
                    room.getExpectationPay())
            ).toList();
        return new PublicRoomListResponse(results.getTotal(), page, roomList);

    }

}
