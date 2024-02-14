package com.a407.back.model.service;

import com.a407.back.config.ImageConfig;
import com.a407.back.config.constants.ErrorCode;
import com.a407.back.config.redis.RedisPublisher;
import com.a407.back.domain.Grade;
import com.a407.back.domain.Notification;
import com.a407.back.domain.Notification.Status;
import com.a407.back.domain.Notification.Type;
import com.a407.back.domain.Report;
import com.a407.back.domain.Review;
import com.a407.back.domain.Room;
import com.a407.back.domain.Zipsa;
import com.a407.back.domain.ZipsaCategory;
import com.a407.back.domain.ZipsaCategoryId;
import com.a407.back.dto.room.PublicRoomListResponse;
import com.a407.back.dto.util.PublicRoom;
import com.a407.back.dto.util.ReportListDto;
import com.a407.back.dto.zipsa.PublicRoomNotificationRequest;
import com.a407.back.dto.zipsa.ReportResponse;
import com.a407.back.dto.zipsa.ZipsaChangeDto;
import com.a407.back.dto.zipsa.ZipsaChangeRequest;
import com.a407.back.dto.zipsa.ZipsaCreateRequest;
import com.a407.back.dto.zipsa.ZipsaDetailInfoResponse;
import com.a407.back.dto.zipsa.ZipsaInfoResponse;
import com.a407.back.dto.zipsa.ZipsaRecordResponse;
import com.a407.back.dto.zipsa.ZipsaReservationInfoResponse;
import com.a407.back.dto.zipsa.ZipsaReviewResponse;
import com.a407.back.dto.zipsa.ZipsaStatusResponse;
import com.a407.back.exception.CustomException;
import com.a407.back.model.repo.GradeRepository;
import com.a407.back.model.repo.NotificationRepository;
import com.a407.back.model.repo.RoomRepository;
import com.a407.back.model.repo.UserRepository;
import com.a407.back.model.repo.ZipsaRepository;
import com.querydsl.core.QueryResults;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ZipsaServiceImpl implements ZipsaService {

    private final ZipsaRepository zipsaRepository;

    private final RoomRepository roomRepository;

    private final NotificationRepository notificationRepository;

    private final ImageConfig imageConfig;

    private final RedisPublisher redisPublisher;

    private final UserRepository userRepository;

    private final GradeRepository gradeRepository;

    @Value("${image.size.report}")
    private Integer repostSize;

    @Override
    @Transactional
    public void makeReport(Long roomId, MultipartFile image, String content) throws IOException {
        Room room = roomRepository.findByRoomId(roomId);
        String fileName = imageConfig.resizeImage(image, repostSize);
        Report report = Report.builder().roomId(room).processImage(fileName).processContent(content)
            .build();
        zipsaRepository.makeReport(report);
        makeConfirmNotification(roomId);
    }

    @Override
    public ReportResponse findReportByRoomIdList(Long roomId) {
        List<ReportListDto> reports = zipsaRepository.findReportByRoomIdList(roomId).stream().map(
            report -> new ReportListDto(report.getProcessImage(), report.getProcessContent(),
                report.getCreatedAt())).toList();
        Room room = roomRepository.findByRoomId(roomId);

        return new ReportResponse(room.getUserId().getName(),
            room.getZipsaId().getZipsaId().getName(), reports);
    }

    @Override
    public ZipsaDetailInfoResponse findZipsaDetailFindByZipsaId(Long userId, Long zipsaId) {
        Zipsa zipsa = zipsaRepository.findByZipsaId(zipsaId == 0 ? userId : zipsaId);
        List<String> subCategoryList = zipsaRepository.searchSubCategoryList(zipsa.getZipsaId().getUserId());
        return ZipsaDetailInfoResponse.builder()
            .name(zipsa.getZipsaId().getName())
            .email(zipsa.getZipsaId().getEmail())
            .phoneNumber(zipsa.getZipsaId().getPhoneNumber())
            .birth(zipsa.getZipsaId().getBirth())
            .gender(zipsa.getZipsaId().getGender())
            .address(zipsa.getZipsaId().getAddress())
            .profileImage(zipsa.getZipsaId().getProfileImage())
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
    public ZipsaInfoResponse findZipsaFindByZipsaId(Long userId, Long zipsaId) {
        Zipsa zipsa = zipsaRepository.findByZipsaId(zipsaId == 0 ? userId : zipsaId);
        return ZipsaInfoResponse.builder()
            .name(zipsa.getZipsaId().getName())
            .profileImage(zipsa.getZipsaId().getProfileImage())
            .gradeId(zipsa.getGradeId().getGradeId())
            .gradeName(zipsa.getGradeId().getName())
            .kindnessAverage(zipsa.getKindnessAverage())
            .skillAverage(zipsa.getSkillAverage())
            .rewindAverage(zipsa.getRewindAverage())
            .build();
    }

    @Override
    public List<ZipsaReviewResponse> findsZipsaReviewFindByZipsaId(Long userId, Long zipsaId) {
        List<Review> reviews = zipsaRepository.searchReviewList(zipsaId == 0 ? userId : zipsaId);
        return reviews.stream().map(review -> ZipsaReviewResponse.builder()
            .userName(review.getUserId().getName())
            .profileImage(review.getUserId().getProfileImage())
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
    public List<ZipsaRecordResponse> getZipsaRecordList(Long zipsaId) {
        return userRepository.getUserRecordList(zipsaId, true).stream().map(

            room -> ZipsaRecordResponse.builder().roomId(room.getRoomId())
                .name(room.getUserId().getName())
                .majorCategoryName(room.getSubCategoryId().getMajorCategoryId().getName())
                .subCategoryName(room.getSubCategoryId().getName()).content(room.getContent())
                .startedAt(room.getStartedAt()).endedAt(room.getEndedAt())
                .totalPay(room.getTotalPay()).build()).toList();

    }

    @Override
    public ZipsaReservationInfoResponse getZipsaReservationInfo(Long roomId) {
        Room room = zipsaRepository.getZipsaReservationInfo(roomId);
        return ZipsaReservationInfoResponse.builder()
            .name(room.getUserId().getName())
            .profileImage(room.getUserId().getProfileImage())
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
            .status(room.getStatus())
            .build();
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
        QueryResults<Room> results = roomRepository.getPublicRoomList((page - 1) * size, size);
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

    @Override
    @Transactional
    public void changeZipsaStatus(Long zipsaId) {
        Zipsa zipsa = zipsaRepository.findByZipsaId(zipsaId);
        if (zipsa == null) {
            throw new CustomException(ErrorCode.BAD_REQUEST_ERROR);
        }
        zipsaRepository.changeZipsaStatus(zipsaId, !Boolean.TRUE.equals(zipsa.getIsWorked()));
    }

    @Override
    public ZipsaStatusResponse getZipsaWorkStatus(Long zipsaId) {
        Zipsa zipsa = zipsaRepository.findByZipsaId(zipsaId);
        return new ZipsaStatusResponse(zipsaId, zipsa.getIsWorked());
    }

    @Override
    @Transactional
    public void makeConfirmNotification(Long roomId) {
        Room room = roomRepository.findByRoomId(roomId);
        Notification notification = Notification.builder().roomId(room)
            .sendId(room.getZipsaId().getZipsaId().getUserId())
            .receiveId(room.getUserId().getUserId()).status(Status.CONFIRM)
            .type(Type.USER)
            .isRead(false).createdAt(
                Timestamp.valueOf(LocalDateTime.now())).build();
        notificationRepository.makeNotification(notification);

        Zipsa zipsa = zipsaRepository.findByZipsaId(room.getUserId().getUserId());
        if (zipsa == null || !zipsa.getIsWorked()) {
            redisPublisher.send(room.getUserId().getUserId());
        }
    }

    @Override
    @Transactional
    public Long makeZipsa(Long userId, Boolean isCertificated, ZipsaCreateRequest request) {
        // 인증이 완료되지 않은 경우
        if (Boolean.FALSE.equals(isCertificated)) {
            throw new CustomException(ErrorCode.INVALID_PARAMETER);
        }
        // 이미 집사인 경우
        if (zipsaRepository.findByZipsaId(userId) != null) {
            throw new CustomException(ErrorCode.INVALID_PARAMETER);
        }
        // 조건을 만족하는 경우
        if (!request.getMajorCategoryList().isEmpty()
            && request.getMajorCategoryList().size() < 6) {
            Grade grade = gradeRepository.findGradeById(1L);
            Zipsa zipsa = Zipsa.builder()
                .zipsaId(userRepository.findByUserId(userId)).gradeId(grade)
                .description(request.getDescription())
                .account(request.getAccount())
                .isWorked(false).preferTag(request.getPreferTag())
                .serviceCount(0).replyAverage(0D).replyCount(0).skillAverage(0D)
                .rewindAverage(0D).kindnessAverage(0D)
                .build();
            Long zipsaId = zipsaRepository.makeZipsa(zipsa).getZipsaId().getUserId();
            for (Long majorCategoryId : request.getMajorCategoryList()) {
                ZipsaCategoryId zipsaCategoryId = new ZipsaCategoryId(zipsa,
                    zipsaRepository.getMajorCategory(majorCategoryId));
                zipsaRepository.makeZipsaCategory(
                    ZipsaCategory.builder().zipsaCategoryId(zipsaCategoryId).build());
            }

            return zipsaId;

        }

        // 대분류 카테고리 수가 다른 경우
        throw new CustomException(ErrorCode.MISSING_REQUEST_PARAMETER_ERROR);
    }

    @Override
    @Transactional
    public void changeZipsaInfo(Long zipsaId, ZipsaChangeRequest request) {
        Zipsa zipsa = zipsaRepository.findByZipsaId(zipsaId);
        ZipsaChangeDto zipsaChangeDto = new ZipsaChangeDto(
            request.getDescription() == null ? zipsa.getDescription() : request.getDescription(),
            request.getPreferTag() == null ? zipsa.getPreferTag() : request.getPreferTag());
        zipsaRepository.changeZipsaInfo(zipsaId, zipsaChangeDto);
    }

    @Override
    public Boolean findZipsaDistinction(Long userId) {
        Zipsa zipsa = zipsaRepository.findByZipsaId(userId);
        if (zipsa == null) {
            return false;
        } else {
            return true;
        }
    }

}