package com.a407.back.model.service;

import static java.security.SecureRandom.getInstanceStrong;

import com.a407.back.config.constants.ErrorCode;
import com.a407.back.domain.Complain;
import com.a407.back.domain.Notification;
import com.a407.back.domain.Room;
import com.a407.back.domain.Room.Process;
import com.a407.back.domain.User;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.notification.NotificationListResponse;
import com.a407.back.dto.room.PublicRoomListResponse;
import com.a407.back.dto.user.UserAccountRequest;
import com.a407.back.dto.user.UserAccountResponse;
import com.a407.back.dto.user.UserComplainRequest;
import com.a407.back.dto.user.UserCreateRequest;
import com.a407.back.dto.user.UserDetailInfoResponse;
import com.a407.back.dto.user.UserNearZipsaInfoResponse;
import com.a407.back.dto.user.UserNearZipsaLocationResponse;
import com.a407.back.dto.user.UserNearZipsaRequest;
import com.a407.back.dto.user.UserPhoneNumberAndEmail;
import com.a407.back.dto.user.UserRecordsResponse;
import com.a407.back.dto.user.UserReservationResponse;
import com.a407.back.dto.user.UserUpdateDto;
import com.a407.back.dto.user.UserUpdateRequest;
import com.a407.back.dto.util.PublicRoom;
import com.a407.back.exception.CustomException;
import com.a407.back.model.repo.CategoryRepository;
import com.a407.back.model.repo.ComplainRepository;
import com.a407.back.model.repo.RoomRepository;
import com.a407.back.model.repo.UserRepository;
import com.a407.back.model.repo.ZipsaRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.transaction.Transactional;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final ZipsaRepository zipsaRepository;

    private final CategoryRepository categoryRepository;

    private final DefaultMessageService messageService;

    private final RoomRepository roomRepository;

    private final ComplainRepository complainRepository;

    @Value("${sms.number}")
    private String senderPhoneNumber;


    @Override
    @Transactional
    public Long makeUser(UserCreateRequest request) {
        // 에러 처리
        if (userRepository.findByUserEmail(request.getEmail()) != null) {
            throw new CustomException(ErrorCode.INVALID_PARAMETER);
        }

        User user = User.builder()
            .email(request.getEmail())
            .password(request.getPassword())
            .name(request.getName())
            .birth(request.getBirth())
            .gender(request.getGender())
            .address(request.getAddress())
            .latitude(request.getLatitude())
            .longitude(request.getLongitude())
            .isAdmin(false)
            .isCertificated(false)
            .isBlocked(false)
            .isAffiliated(false)
            .build();

        return userRepository.makeUser(user).getUserId();
    }

    @Override
    @Transactional
    public List<NotificationListResponse> findNotificationByUserIdList(Long userId) {
        boolean workedDistinction = isWorkedDistinction(userId);
        List<Notification> notificationList = null;
        List<NotificationListResponse> notificationResponseList = new ArrayList<>();
        if (workedDistinction) {
            notificationList = userRepository.findNotificationByUserIdList(userId, "ZIPSA");
        } else {
            notificationList = userRepository.findNotificationByUserIdList(userId, "USER");
        }
        for (Notification n : notificationList) {
            notificationResponseList.add(
                new NotificationListResponse(userRepository.findByUserId(userId).getName(),
                    n.getType(), n.getStatus(), categoryRepository.findMajorCategoryName(
                    n.getRoomId().getSubCategoryId().getMajorCategoryId().getMajorCategoryId()),
                    n.getRoomId().getRoomId(), n.getNotificationId(), n.getCreatedAt()));
        }
        return notificationResponseList;
    }

    @Override
    public boolean isWorkedDistinction(Long userId) {
        Zipsa zipsa = zipsaRepository.findByZipsaId(userId);
        return zipsa != null && zipsa.getIsWorked();
    }


    @Override
    public List<UserNearZipsaLocationResponse> findNearZipsaLocationList(Long userId) {
        return userRepository.findNearZipsaLocationList(userId).stream().map(
            zipsa -> new UserNearZipsaLocationResponse(zipsa.getZipsaId().getLatitude(),
                zipsa.getZipsaId().getLongitude())).toList();
    }

    @Override
    public List<UserNearZipsaInfoResponse> findNearZipsaInfoList(
        UserNearZipsaRequest userNearZipsaRequest) {

        return userRepository.findNearZipsaInfoList(userNearZipsaRequest.getLat(),
                userNearZipsaRequest.getLng()).stream().map(
                zipsa -> new UserNearZipsaInfoResponse(zipsa.getZipsaId().getName(),
                    zipsa.getZipsaId().getGender(), zipsa.getGradeId().getName(),
                    zipsa.getDescription(), zipsa.getPreferTag(), zipsa.getZipsaId().getUserId()))
            .toList();
    }

    @Override
    public User findByUserId(Long userId) {
        return userRepository.findByUserId(userId);
    }

    @Override
    public List<UserRecordsResponse> getUserRecordList(Long userId) {
        return userRepository.getUserRecordList(userId).stream().map(
                room -> UserRecordsResponse.builder().roomId(room.getRoomId())
                    .zipsaId(room.getZipsaId().getZipsaId().getUserId())
                    .name(room.getZipsaId().getZipsaId().getName()).profile(
                        room.getZipsaId().getZipsaId().getProfileImage() == null ? null
                            : Arrays.toString(room.getZipsaId().getZipsaId().getProfileImage()))
                    .subCategoryName(room.getSubCategoryId().getName())
                    .majorCategoryName(room.getSubCategoryId().getMajorCategoryId().getName())
                    .content(room.getContent()).estimateDuration(room.getEstimateDuration())
                    .roomCreatedAt(room.getRoomCreatedAt()).matchCreatedAt(room.getMatchCreatedAt())
                    .isReported(room.getIsReported()).reportCycle(room.getReportCycle())
                    .isPublic(room.getIsPublic()).startedAt(room.getStartedAt())
                    .endedAt(room.getEndedAt()).expectationStartedAt(room.getExpectationStartedAt())
                    .expectationEndedAt(room.getExpectationEndedAt())
                    .expectationPay(room.getExpectationPay()).totalPay(room.getTotalPay())
                    .isComplained(room.getIsComplained()).isReviewed(room.getIsReviewed()).build())
            .toList();
    }

    @Override
    public List<UserReservationResponse> getUserReservationList(Long userId) {
        return userRepository.getUserReservationList(userId).stream().map(
            room -> UserReservationResponse.builder()
                .zipsaId(room.getZipsaId().getZipsaId().getUserId())
                .name(room.getZipsaId().getZipsaId().getName()).profile(
                    room.getZipsaId().getZipsaId().getProfileImage() == null ? null
                        : Arrays.toString(room.getZipsaId().getZipsaId().getProfileImage()))
                .subCategoryName(room.getSubCategoryId().getName())
                .majorCategoryName(room.getSubCategoryId().getMajorCategoryId().getName())
                .content(room.getContent()).estimateDuration(room.getEstimateDuration())
                .roomCreatedAt(room.getRoomCreatedAt()).matchCreatedAt(room.getMatchCreatedAt())
                .isReported(room.getIsReported()).reportCycle(room.getReportCycle())
                .isPublic(room.getIsPublic()).startedAt(room.getStartedAt())
                .endedAt(room.getEndedAt()).expectationStartedAt(room.getExpectationStartedAt())
                .expectationEndedAt(room.getExpectationEndedAt())
                .expectationPay(room.getExpectationPay()).build()).toList();
    }

    @Override
    @Transactional
    public UserAccountResponse makeAccount(UserAccountRequest userAccountRequest) {
        User user = userRepository.findByUserId(userAccountRequest.getUserId());
        if (user == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        if (user.getAccount() != null && user.getAccount()
            .equals(userAccountRequest.getAccount())) {
            return new UserAccountResponse("이미 등록된 카드입니다");
        }

        userRepository.makeAccount(user.getUserId(), userAccountRequest.getAccount());

        return new UserAccountResponse("카드 등록 성공");
    }

    @Override
    public String getMaskedCardNumber(Long userId) {
        User user = userRepository.findByUserId(userId);
        if (user == null || user.getAccount() == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        String cardNumber = user.getAccount();
        return "****-****-****-" + cardNumber.substring(cardNumber.length() - 4);
    }

    @Override
    public void makeSendMessage(String phoneNumber, String email)
        throws JsonProcessingException, NoSuchAlgorithmException {
        int code = getInstanceStrong().nextInt(1000, 9999);
        while (userRepository.findCode(String.valueOf(code)) != null) {
            code = getInstanceStrong().nextInt(1000, 9999);
        }
        Message message = new Message();
        message.setFrom(senderPhoneNumber);
        message.setTo(phoneNumber);
        message.setText("인증 번호 " + code + " 를 입력해주세요");
        SingleMessageSentResponse response = messageService.sendOne(
            new SingleMessageSendingRequest(message));
        if (response == null || !response.getStatusCode().equals("2000")) {
            throw new CustomException(ErrorCode.BAD_REQUEST_ERROR);
        }
        UserPhoneNumberAndEmail userPhoneNumberAndEmail = new UserPhoneNumberAndEmail(email,
            phoneNumber);
        userRepository.makeSendMessage(userPhoneNumberAndEmail, String.valueOf(code));
    }

    @Override
    @Transactional
    public void deleteAccount(Long userId) {
        User user = userRepository.findByUserId(userId);
        if (user == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        userRepository.deleteAccount(user, user.getAccount());
    }

    @Override
    @Transactional
    public void makePhoneNumber(String code, String email) throws JsonProcessingException {
        UserPhoneNumberAndEmail userPhoneNumberAndEmail = userRepository.findMessage(code);
        if (userPhoneNumberAndEmail == null || !userPhoneNumberAndEmail.getEmail().equals(email)) {
            throw new CustomException(ErrorCode.INVALID_PARAMETER);
        }
        userRepository.makePhoneNumber(userPhoneNumberAndEmail.getPhoneNumber(),
            userPhoneNumberAndEmail.getEmail());
    }

    @Override
    @Transactional
    public void makeComplain(UserComplainRequest userComplainRequest) {
        Room room = roomRepository.findByRoomId(userComplainRequest.getRoomId());
        if (room == null || room.getIsComplained() || room.getStatus() != Process.END
            || complainRepository.findComplain(userComplainRequest.getRoomId()) != null) {
            throw new CustomException(ErrorCode.INVALID_PARAMETER);
        }
        Complain complain = Complain.builder()
            .roomId(roomRepository.findByRoomId(userComplainRequest.getRoomId()))
            .content(userComplainRequest.getContent()).isProcessed(false).build();
        complainRepository.makeComplain(complain);
        roomRepository.changeIsComplained(room.getRoomId());
    }

    @Override
    public PublicRoomListResponse getUserPublicRoomList(Long userId) {
        User user = userRepository.findByUserId(userId);
        List<PublicRoom> publicRoomList = roomRepository.getUserPublicRoomList(user).stream()
            .map(
                room -> new PublicRoom(room.getRoomId(), room.getSubCategoryId().getSubCategoryId(),
                    room.getTitle(), room.getContent(), room.getPlace(), room.getEstimateDuration(),
                    room.getRoomCreatedAt(), room.getExpectationStartedAt(),
                    room.getExpectationEndedAt(), room.getExpectationPay())).toList();
        return new PublicRoomListResponse((long) publicRoomList.size(), 1, publicRoomList);
    }

    @Override
    @Transactional
    public void changeUserInfo(Long userId, UserUpdateRequest request) {
        Byte[] profileImage = null;
        if (request.getProfileImage() != null) {
            int length = request.getProfileImage().getBytes().length;
            profileImage = new Byte[length];
            byte[] profileImageBefore = request.getProfileImage().getBytes();
            for (int i = 0; i < length; i++) {
                profileImage[i] = profileImageBefore[i];
            }
        }
        User user = userRepository.findByUserId(userId);
        UserUpdateDto userUpdateDto = new UserUpdateDto(
            profileImage == null ? user.getProfileImage() : profileImage,
            request.getAddress() == null ? user.getAddress() : request.getAddress(),
            request.getLatitude() == null ? user.getLatitude() : request.getLatitude(),
            request.getLongitude() == null ? user.getLongitude() : request.getLongitude(),
            request.getPassword() == null ? user.getPassword() : request.getPassword());
        Zipsa zipsa = zipsaRepository.findByZipsaId(userId);
        if (zipsa != null) {
            zipsaRepository.changeZipsaDescription(userId,
                request.getDescription() == null ? zipsa.getDescription()
                    : request.getDescription());
        }
        userRepository.changeUserInfo(userId, userUpdateDto);
    }

    @Override
    @Transactional
    public UserDetailInfoResponse findUserDetailInfo(Long userId) {
        User user = userRepository.findByUserId(userId);
        Zipsa zipsa = zipsaRepository.findByZipsaId(userId);

        Byte[] originByte = user.getProfileImage();

        byte[] responseByte = new byte[originByte.length];

        for (int i = 0; i < originByte.length; i++) {
            responseByte[i] = originByte[i];
        }

        String profileImage = new String(responseByte);

        return UserDetailInfoResponse.builder().profileImage(profileImage).name(user.getName())
            .birth(user.getBirth()).email(user.getEmail()).phoneNumber(user.getPhoneNumber())
            .address(user.getAddress()).description(zipsa != null ? zipsa.getDescription() : null)
            .build();
    }

    @Override
    @Transactional
    public void deleteUser(Long userId) {
        zipsaRepository.deleteZipsa(userId);
        userRepository.deleteUser(userId);
    }


}
