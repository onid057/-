package com.a407.back.model.repo;

import com.a407.back.domain.Review;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class ReviewRepositoryImpl implements ReviewRepository {

    private final EntityManager em;

    @Override
    public void createReview(Review review) {
        em.persist(review);
    }
}
