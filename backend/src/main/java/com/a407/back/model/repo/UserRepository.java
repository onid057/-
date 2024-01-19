package com.a407.back.model.repo;

import com.a407.back.domain.Notification;
import com.a407.back.domain.User;
import java.util.List;

public interface UserRepository {

    User findByUserEmail(String email);

    User save(User user);

    List<Notification> findNotificationByUserId(Long userId, String type);

    User findByUserId(Long userId);
}
