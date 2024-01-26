package com.a407.back.model.repo;

import com.a407.back.domain.QReview;
import com.a407.back.domain.Review;
import com.a407.back.dto.Review.ReviewListResponse;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class ReviewRepositoryImpl implements ReviewRepository {

    private final EntityManager em;
    private final JPAQueryFactory query;

    @Override
    public void createReview(Review review) {
        em.persist(review);
    }

    @Override
    public Long countZipsaReview(Long zipsaId) {
        QReview qReview = QReview.review;
        return query.select(qReview.count()).from(qReview)
            .where(qReview.zipsaId.zipsaId.userId.eq(zipsaId))
            .fetchOne();
    }

    @Override
    public List<ReviewListResponse> getReviewsByUserId(Long userId) {
        QReview qReview = QReview.review;
        return query.selectFrom(qReview).where(qReview.userId.userId.eq(userId)).orderBy(qReview.createdAt.desc()).fetch().stream()
            .map(ReviewListResponse::getDto).toList();
    }
}
