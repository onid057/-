package com.a407.back.model.repo;

import com.a407.back.domain.Notification;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class NotificationRepositoryImpl implements NotificationRepository {
    private final JPAQueryFactory query;

    private final EntityManager em;

    @Override
    public Notification findByNotificationId(Long notificationId) {
        return em.find(Notification.class, notificationId);
    }
}
