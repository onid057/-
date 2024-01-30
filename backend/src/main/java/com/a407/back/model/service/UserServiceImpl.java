package com.a407.back.model.service;

import static java.security.SecureRandom.getInstanceStrong;

import com.a407.back.config.constants.ErrorCode;
import com.a407.back.domain.Notification;
import com.a407.back.domain.User;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.Notification.NotificationListResponse;
import com.a407.back.dto.User.UserAccountRequest;
import com.a407.back.dto.User.UserAccountResponse;
import com.a407.back.dto.User.UserNearZipsaResponse;
import com.a407.back.dto.User.UserPhoneNumberAndEmail;
import com.a407.back.dto.User.UserPhoneNumberRequest;
import com.a407.back.dto.User.UserRecordsResponse;
import com.a407.back.dto.User.UserReservationResponse;
import com.a407.back.exception.CustomException;
import com.a407.back.model.repo.CategoryRepository;
import com.a407.back.model.repo.RedisRepositoryImpl;
import com.a407.back.model.repo.UserRepository;
import com.a407.back.model.repo.ZipsaRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.transaction.Transactional;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final ZipsaRepository zipsaRepository;

    private final CategoryRepository categoryRepository;

    private final DefaultMessageService messageService;

    private final RedisRepositoryImpl redisRepository;

    @Override
    @Transactional
    public Long save(User user) {
        // 에러 처리
        if (userRepository.findByUserEmail(user.getEmail()) != null) {
            throw new CustomException(ErrorCode.INVALID_PARAMETER);
        }
        return userRepository.save(user).getUserId();
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
            notificationResponseList.add(new NotificationListResponse(
                userRepository.findByUserId(userId).getName(),
                n.getType(),
                n.getStatus(),
                categoryRepository.findMajorCategoryName(
                    n.getRoomId().getSubCategoryId().getMajorCategoryId().getMajorCategoryId()),
                n.getRoomId().getRoomId(),
                n.getNotificationId()
            ));
        }
        return notificationResponseList;
    }

    @Override
    public boolean isWorkedDistinction(Long userId) {
        Zipsa zipsa = zipsaRepository.findByZipsaId(userId);
        return zipsa != null && zipsa.getIsWorked();
    }


    @Override
    public UserNearZipsaResponse findNearZipsaList(Long userId) {
        return userRepository.findNearZipsaList(userId);
    }

    @Override
    public User findByUserId(Long userId) {
        return userRepository.findByUserId(userId);
    }

    @Override
    public UserRecordsResponse findRecordsByUserId(Long userId) {
        return userRepository.findRecordsByUserId(userId);
    }

    @Override
    public UserReservationResponse findReservationByUserId(Long userId) {
        return userRepository.findReservationByUserId(userId);
    }

    @Transactional
    public UserAccountResponse saveAccount(UserAccountRequest userAccountRequest) {
        User user = userRepository.findByUserId(userAccountRequest.getUserId());
        if (user == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        if (user.getAccount() != null && user.getAccount()
            .equals(userAccountRequest.getAccount())) {
            return new UserAccountResponse("이미 등록된 카드입니다");
        }

        userRepository.saveAccount(user.getUserId(), userAccountRequest.getAccount());

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
    @Transactional
    public void deleteAccount(Long userId) {
        User user = userRepository.findByUserId(userId);
        if (user == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        userRepository.deleteAccount(user, user.getAccount());
    }

    @Override
    public void sendMessage(UserPhoneNumberRequest userPhoneNumberRequest, String email)
        throws JsonProcessingException, NoSuchAlgorithmException {
        int code = getInstanceStrong().nextInt(1000, 9999);
        Message message = new Message();
        message.setFrom("01035511284");
        message.setTo(userPhoneNumberRequest.getPhoneNumber());
        message.setText("인증 번호 " + code + " 를 입력해주세요");
        SingleMessageSentResponse response = messageService.sendOne(
            new SingleMessageSendingRequest(message));
        if (response == null || !response.getStatusCode().equals("2000")) {
            throw new CustomException(ErrorCode.BAD_REQUEST_ERROR);
        }
        UserPhoneNumberAndEmail userPhoneNumberAndEmail = new UserPhoneNumberAndEmail(email,
            userPhoneNumberRequest.getPhoneNumber());
        redisRepository.saveMessage(userPhoneNumberAndEmail, String.valueOf(code));
    }

    @Override
    @Transactional
    public void savePhoneNumber(String code, String email) throws JsonProcessingException {
        UserPhoneNumberAndEmail userPhoneNumberAndEmail = redisRepository.findMessage(code);
        if (userPhoneNumberAndEmail == null || !userPhoneNumberAndEmail.getEmail().equals(email)) {
            throw new CustomException(ErrorCode.INVALID_PARAMETER);
        }
        userRepository.savePhoneNumber(userPhoneNumberAndEmail.getPhoneNumber(),
            userPhoneNumberAndEmail.getEmail());
    }

}
