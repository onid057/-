package com.a407.back.model.service;

import com.a407.back.config.constants.ErrorCode;
import com.a407.back.domain.Notification;
import com.a407.back.domain.User;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.Notification.NotificationListResponse;
import com.a407.back.dto.User.UserAccountRequest;
import com.a407.back.dto.User.UserAccountResponse;
import com.a407.back.dto.User.UserNearZipsaResponse;
import com.a407.back.dto.User.UserRecordsResponse;
import com.a407.back.dto.User.UserReservationResponse;
import com.a407.back.exception.CustomException;
import com.a407.back.model.repo.CategoryRepository;
import com.a407.back.model.repo.UserRepository;
import com.a407.back.model.repo.ZipsaRepository;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final ZipsaRepository zipsaRepository;

    private final CategoryRepository categoryRepository;

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
    public List<NotificationListResponse> findNotificationsByUserId(Long userId) {
        boolean workedDistinction = isWorkedDistinction(userId);
        List<Notification> notificationList = null;
        List<NotificationListResponse> notificationResponseList = new ArrayList<>();
        if (workedDistinction) {
            notificationList = userRepository.findNotificationByUserId(userId, "zipsa");
        } else {
            notificationList = userRepository.findNotificationByUserId(userId, "user");
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
}
