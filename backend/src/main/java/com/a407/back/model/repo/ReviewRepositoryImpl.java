package com.a407.back.model.repo;

import com.a407.back.domain.QReview;
import com.a407.back.domain.QZipsa;
import com.a407.back.domain.Review;
import com.a407.back.domain.Zipsa;
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
        return query.selectFrom(qReview).where(qReview.userId.userId.eq(userId))
            .orderBy(qReview.createdAt.desc()).fetch().stream()
            .map(ReviewListResponse::getDto).toList();
    }

    @Override
    public void removeReviewByReviewId(Long reviewId) {
        QReview qReview = QReview.review;
        query.delete(qReview).where(qReview.reviewId.eq(reviewId)).execute();
    }

    @Override
    public Zipsa getZipsaByReviewId(Long reviewId) {
        QZipsa qZipsa = QZipsa.zipsa;
        QReview qReview = QReview.review;
        return query.selectFrom(qZipsa).where(qZipsa.zipsaId.userId.eq(
            query.select(qReview.zipsaId.zipsaId.userId).from(qReview)
                .where(qReview.reviewId.eq(reviewId))
                .fetchOne())).fetchOne();
    }

    @Override
    public Review getReviewByReviewId(Long reviewId) {
        return em.find(Review.class, reviewId);
    }
}
