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
import com.a407.back.dto.zipsa.ZipsaChangeDto;
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
        QRoom qRoom = QRoom.room;
        query.update(qRoom).set(qRoom.isReported, true)
            .where(qRoom.roomId.eq(report.getRoomId().getRoomId())).execute();
    }

    @Override
    public List<Report> findReportByRoomIdList(Long roomId) {
        return
            query.selectFrom(qReport).where(qReport.roomId.roomId.eq(roomId))
                .orderBy(qReport.createdAt.desc()).fetch();
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
    public Room getZipsaRecordInfo(Long roomId) {
        QRoom qRoom = QRoom.room;
        return query.selectFrom(qRoom)
            .where(qRoom.roomId.eq(roomId).and(qRoom.status.eq(
                Process.END))).orderBy(qRoom.endedAt.desc()).limit(1).fetchOne();
    }

    @Override
    public Room getZipsaReservationInfo(Long roomId) {
        QRoom qRoom = QRoom.room;
        return query.selectFrom(qRoom)
            .where(qRoom.roomId.eq(roomId).and(qRoom.status.in(
                Process.BEFORE, Process.ONGOING))).orderBy(qRoom.expectationStartedAt.asc())
            .fetchOne();
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
    public void deleteZipsa(Long zipsaId) {
        QZipsa qZipsa = QZipsa.zipsa;
        query.delete(qZipsa).where(qZipsa.zipsaId.userId.eq(zipsaId)).execute();
    }

    @Override
    public void changeZipsaInfo(Long zipsaId, ZipsaChangeDto zipsaChangeDto) {
        QZipsa qZipsa = QZipsa.zipsa;
        query.update(qZipsa).set(qZipsa.description, zipsaChangeDto.getDescription())
            .set(qZipsa.preferTag, zipsaChangeDto.getPreferTag())
            .where(qZipsa.zipsaId.userId.eq(zipsaId)).execute();
    }

    @Override
    public void changeZipsaStatus(Long zipsaId, boolean status) {
        QZipsa qZipsa = QZipsa.zipsa;
        query.update(qZipsa).set(qZipsa.isWorked, status)
            .where(qZipsa.zipsaId.userId.eq(zipsaId)).execute();
    }

    @Override
    public Zipsa makeZipsa(Zipsa zipsa) {
        em.persist(zipsa);
        return zipsa;
    }

    @Override
    public void changeZipsaReplyCount(Zipsa zipsa, double replyAverage) {
        QZipsa qZipsa = QZipsa.zipsa;
        int replyCount = zipsa.getReplyCount() + 1;
        query.update(qZipsa).set(qZipsa.replyCount, replyCount).set(qZipsa.replyAverage, replyAverage).where(qZipsa.eq(zipsa)).execute();
    }

}