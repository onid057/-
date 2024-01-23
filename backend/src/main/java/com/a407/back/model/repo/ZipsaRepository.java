package com.a407.back.model.repo;

import com.a407.back.domain.Report;
import com.a407.back.dto.ReportSearchResponse;
import com.a407.back.domain.Room;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.ZipsaDetailInfoResponse;
import java.util.List;

public interface ZipsaRepository {

    Long saveReport(Report report);

    ReportSearchResponse reportFindByRoomId(Long roomId);

    Zipsa findByZipsaId(Long zipsaId);

    ZipsaDetailInfoResponse zipsaAndReviewFindByZipsaId(Long zipsaId);

}
