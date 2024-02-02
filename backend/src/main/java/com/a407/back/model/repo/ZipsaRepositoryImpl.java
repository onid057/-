package com.a407.back.model.repo;

import com.a407.back.domain.QReport;
import com.a407.back.domain.QReview;
import com.a407.back.domain.QRoom;
import com.a407.back.domain.QZipsa;
import com.a407.back.domain.Report;
import com.a407.back.domain.Review;
import com.a407.back.domain.Room;
import com.a407.back.domain.Room.Process;
import com.a407.back.domain.Zipsa;
import com.querydsl.core.QueryResults;
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
    public void makeReport(Report report) {
        em.persist(report);
    }

    @Override
    public List<Report> findReportByRoomIdList(Long roomId) {
        return
            query.selectFrom(qReport).where(qReport.roomId.roomId.eq(roomId)).fetch();
    }

    @Override
    public Zipsa findByZipsaId(Long zipsaId) {
        return em.find(Zipsa.class, zipsaId);
    }

    @Override
    public List<String> searchSubCategoryList(Long zipsaId) {
        QRoom qRoom = QRoom.room;
        return query.select(qRoom.subCategoryId.name).from(qRoom)
            .where(qRoom.zipsaId.zipsaId.userId.eq(zipsaId).and(qRoom.status.eq(Process.END)))
            .groupBy(qRoom.subCategoryId.subCategoryId)
            .orderBy(qRoom.subCategoryId.subCategoryId.count().desc()).limit(3).fetch();
    }

    @Override
    public List<Review> searchReviewList(Long zipsaId) {
        QReview qReview = QReview.review;
        return query.selectFrom(qReview)
            .where(qReview.zipsaId.zipsaId.userId.eq(zipsaId)).orderBy(qReview.createdAt.desc())
            .fetch();
    }

    @Override
    public List<Room> getZipsaRecordList(Long helperId) {
        QRoom qRoom = QRoom.room;
        return query.selectFrom(qRoom)
            .where(qRoom.zipsaId.zipsaId.userId.eq(helperId).and(qRoom.status.eq(
                Process.END))).orderBy(qRoom.expectationStartedAt.asc()).fetch();
    }

    @Override
    public List<Room> getZipsaReservationList(Long zipsaId) {
        QRoom qRoom = QRoom.room;
        return query.selectFrom(qRoom)
            .where(qRoom.zipsaId.zipsaId.userId.eq(zipsaId).and(qRoom.status.in(
                Process.BEFORE, Process.ONGOING))).orderBy(qRoom.expectationStartedAt.asc())
            .fetch();
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

    @Override
    public QueryResults<Room> getPublicRoomList(int page, int size) {
        QRoom qRoom = QRoom.room;
        QueryResults<Room> result = query.selectFrom(qRoom).orderBy(qRoom.roomCreatedAt.desc()).offset(page).limit(size).fetchResults();
        return result;
    }
}
