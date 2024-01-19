package com.a407.back.model.service;

import com.a407.back.domain.User;
import com.a407.back.dto.NotificationResponse;
import java.util.List;

public interface UserService {

    Long save(User user);

    List<NotificationResponse> findNotificationsByUserId(Long userId);
}
