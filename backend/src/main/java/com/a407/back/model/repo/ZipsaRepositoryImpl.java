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
    private static final QReport qReport = QReport.report;


    @Override
    public Long makeReport(Report report) {
        em.persist(report);
        return report.getReportId();
    }

    @Override
    public ReportSearchResponse findReportByRoomIdList(Long roomId) {
        return new ReportSearchResponse(
            query.selectFrom(qReport).where(qReport.roomId.roomId.eq(roomId)).fetch());
    }

    @Override
    public Zipsa findByZipsaId(Long zipsaId) {
        return em.find(Zipsa.class, zipsaId);
    }

    @Override
    public ZipsaDetailInfoResponse findZipsaAndReviewFindByZipsaId(Long zipsaId) {
        QReview qReview = QReview.review;
        Zipsa zipsa = em.find(Zipsa.class, zipsaId);
        List<Review> reviews = query.selectFrom(qReview)
            .where(qReview.zipsaId.zipsaId.userId.eq(zipsaId)).orderBy(qReview.createdAt.desc())
            .fetch();

        QRoom qRoom = QRoom.room;
        List<String> subCategory = query.select(qRoom.subCategoryId.name).from(qRoom)
            .where(qRoom.zipsaId.zipsaId.userId.eq(zipsaId).and(qRoom.status.eq(Process.END)))
            .groupBy(qRoom.subCategoryId.subCategoryId)
            .orderBy(qRoom.subCategoryId.subCategoryId.count().desc()).limit(3).fetch();

        return new ZipsaDetailInfoResponse(zipsa, reviews, subCategory);
    }

    @Override
    public ZipsaRecordsResponse getUserRecordList(Long helperId) {
        QRoom qRoom = QRoom.room;
        return new ZipsaRecordsResponse(query.selectFrom(qRoom)
            .where(qRoom.zipsaId.zipsaId.userId.eq(helperId).and(qRoom.status.eq(
                Process.END))).orderBy(qRoom.expectationStartedAt.asc()).fetch());
    }

    @Override
    public ZipsaReservationResponse getZipsaReservationList(Long zipsaId) {
        QRoom qRoom = QRoom.room;

        return new ZipsaReservationResponse(
            query.selectFrom(qRoom)
                .where(qRoom.zipsaId.zipsaId.userId.eq(zipsaId).and(qRoom.status.in(
                    Process.BEFORE, Process.ONGOING))).orderBy(qRoom.expectationStartedAt.asc())
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

    @Override
    public void changeServiceCountIncrease(Zipsa zipsa) {
        QZipsa qZipsa = QZipsa.zipsa;
        int newServiceCount = zipsa.getServiceCount() + 1;
        query.update(qZipsa)
            .set(qZipsa.serviceCount, newServiceCount)
            .where(qZipsa.eq(zipsa)).execute();
    }
}
