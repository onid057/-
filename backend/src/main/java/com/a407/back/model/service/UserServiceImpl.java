package com.a407.back.model.service;

import com.a407.back.config.ErrorCode;
import com.a407.back.domain.Notification;
import com.a407.back.domain.User;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.NotificationResponse;
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

    @Transactional
    public Long save(User user) {
        // 에러 처리
        if (userRepository.findByUserEmail(user.getEmail()) != null) {
            throw new CustomException(ErrorCode.INVALID_PARAMETER);
        }
        return userRepository.save(user).getUserId();
    }

    @Override
    public List<NotificationResponse> findNotificationsByUserId(Long userId) {
        Zipsa zipsa = zipsaRepository.findByZipsaId(userId);
        List<Notification> notificationList = null;
        List<NotificationResponse> notificationResponseList = new ArrayList<>();
        if (zipsa != null && zipsa.isWorked()) {
            notificationList = userRepository.findNotificationByUserId(userId, "zipsa");
        } else {
            notificationList = userRepository.findNotificationByUserId(userId, "user");
        }
        for (Notification n : notificationList) {
            notificationResponseList.add(new NotificationResponse(
                userRepository.findByUserId(userId).getName(),
                n.getType(),
                n.isAccepted(),
                categoryRepository.findMajorCategoryName(
                    n.getRoomId().getSubCategoryId().getMajorCategoryId().getMajorCategoryId()),
                n.getRoomId().getRoomId(),
                n.getNotificationId()
            ));
        }
        return notificationResponseList;
    }
}
