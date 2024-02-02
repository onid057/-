package com.a407.back.model.repo;

import com.a407.back.domain.Report;
import com.a407.back.domain.Review;
import com.a407.back.domain.Room;
import com.a407.back.domain.Zipsa;
import java.util.List;

public interface ZipsaRepository {

    void makeReport(Report report);

    List<Report> findReportByRoomIdList(Long roomId);

    Zipsa findByZipsaId(Long zipsaId);

    List<String> searchSubCategoryList(Long zipsaId);

    List<Review> searchReviewList(Long zipsaId);

    List<Room> getZipsaRecordList(Long helperId);

    List<Room> getZipsaReservationList(Long zipsaId);

    void updateZipsaAverage(Long zipsaId, Double kindnessAverage, Double skillAverage,
        Double rewindAverage);

    void changeServiceCountIncrease(Zipsa zipsa);
}
