package com.a407.back.model.repo;

import com.a407.back.domain.QReport;
import com.a407.back.domain.Report;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.ReportSearchResponse;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.io.IOException;
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
    public ReportSearchResponse reportFindByRoomId(Long roomId) throws IOException {
        return new ReportSearchResponse(
            query.selectFrom(qReport).where(qReport.roomId.roomId.eq(roomId)).fetch());
    }

    @Override
    public Zipsa findByZipsaId(Long zipsaId) {
        return em.find(Zipsa.class, zipsaId);
    }
}
