package com.a407.back.model.repo;

import com.a407.back.domain.QReport;
import com.a407.back.domain.QRoom;
import com.a407.back.domain.Report;
import com.a407.back.domain.Room;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ZipsaRepositoryImpl implements ZipsaRepository {

    private final JPAQueryFactory query;

    private final EntityManager em;
    private final QReport qReport = QReport.report;
    private final QRoom qRoom = QRoom.room;


    @Override
    @Transactional
    public Long saveReport(Report report) {
        em.persist(report);
        return report.getReportId();
    }

    @Override
    @Transactional
    public Room roomFindById(Long roomId) {
        return query.selectFrom(qRoom).where(qRoom.roomId.eq(roomId)).fetchOne();
    }

}
