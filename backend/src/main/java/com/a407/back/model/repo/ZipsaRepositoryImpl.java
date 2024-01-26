package com.a407.back.model.repo;

import com.a407.back.domain.QReport;
import com.a407.back.domain.QReview;
import com.a407.back.domain.QRoom;
import com.a407.back.domain.QZipsa;
import com.a407.back.domain.Report;
import com.a407.back.domain.Review;
import com.a407.back.domain.Room.Process;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.Zipsa.ReportSearchResponse;
import com.a407.back.dto.Zipsa.ZipsaDetailInfoResponse;
import com.a407.back.dto.Zipsa.ZipsaRecordsResponse;
import com.a407.back.dto.Zipsa.ZipsaReservationResponse;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ZipsaRepositoryImpl implements ZipsaRepository {

    private final JPAQueryFactory query;

    private final EntityManager em;
    private final QReport qReport = QReport.report;


    @Override
    public Long saveReport(Report report) {
        em.persist(report);
        return report.getReportId();
    }

    @Override
    public ReportSearchResponse reportFindByRoomId(Long roomId) {
        return new ReportSearchResponse(
            query.selectFrom(qReport).where(qReport.roomId.roomId.eq(roomId)).fetch());
    }

    @Override
    public Zipsa findByZipsaId(Long zipsaId) {
        return em.find(Zipsa.class, zipsaId);
    }

    @Override
    public ZipsaDetailInfoResponse zipsaAndReviewFindByZipsaId(Long zipsaId) {
        QReview qReview = QReview.review;
        Zipsa zipsa = em.find(Zipsa.class, zipsaId);
        List<Review> reviews = query.selectFrom(qReview)
            .where(qReview.zipsaId.zipsaId.userId.eq(zipsaId)).orderBy(qReview.createdAt.desc())
            .fetch();

        QRoom qRoom = QRoom.room;
        List<String> subCategory = query.select(qRoom.subCategoryId.name).from(qRoom)
            .where(qRoom.zipsaId.zipsaId.userId.eq(zipsaId).and(qRoom.status.eq(Process.end)))
            .groupBy(qRoom.subCategoryId.subCategoryId)
            .orderBy(qRoom.subCategoryId.subCategoryId.count().desc()).limit(3).fetch();

        return new ZipsaDetailInfoResponse(zipsa, reviews, subCategory);
    }

    @Override
    public ZipsaRecordsResponse findRecordsByZipsaId(Long helperId) {
        QRoom qRoom = QRoom.room;
        return new ZipsaRecordsResponse(query.selectFrom(qRoom)
            .where(qRoom.zipsaId.zipsaId.userId.eq(helperId).and(qRoom.status.eq(
                Process.end))).orderBy(qRoom.expectationStartedAt.asc()).fetch());
    }

    @Override
    public ZipsaReservationResponse findReservationByZipsaId(Long zipsaId) {
        QRoom qRoom = QRoom.room;

        return new ZipsaReservationResponse(
            query.selectFrom(qRoom)
                .where(qRoom.zipsaId.zipsaId.userId.eq(zipsaId).and(qRoom.status.in(
                    Process.before, Process.ongoing))).orderBy(qRoom.expectationStartedAt.asc())
                .fetch());
    }

    @Override
    public void updateZipsaAverage(Long zipsaId, Double kindnessAverage, Double skillAverage,
        Double rewindAverage) {
        QZipsa qZipsa = QZipsa.zipsa;
        query.update(qZipsa).set(qZipsa.kindnessAverage, kindnessAverage)
            .set(qZipsa.skillAverage, skillAverage).set(qZipsa.rewindAverage, rewindAverage)
            .where(qZipsa.zipsaId.userId.eq(zipsaId))
            .execute();
    }
}
