package com.a407.back.dto.util;

import com.a407.back.domain.Room;
import java.sql.Timestamp;
import java.util.Arrays;
import lombok.Getter;

@Getter
public class ZipsaRecordsList {

    private final String name;
    private final String profile;
    private final String subCategoryName;
    private final String majorCategoryName;
    private final String content;
    private final int estimateDuration;
    private final Timestamp roomCreatedAt;
    private final Timestamp matchCreatedAt;
    private final Boolean isReported;
    private final int reportCycle;
    private final Boolean isPublic;
    private final Timestamp startedAt;
    private final Timestamp endedAt;
    private final Timestamp expectationStartedAt;
    private final Timestamp expectationEndedAt;
    private final int expectationPay;
    private final int totalPay;

    public ZipsaRecordsList(Room room) {
        this.name = room.getUserId().getName();
        if (room.getUserId().getProfileImage() == null) {
            this.profile = null;
        } else {
            this.profile = Arrays.toString(room.getUserId().getProfileImage());
        }
        this.subCategoryName = room.getSubCategoryId().getName();
        this.majorCategoryName = room.getSubCategoryId().getMajorCategoryId().getName();
        this.content = room.getContent();
        this.estimateDuration = room.getEstimateDuration();
        this.roomCreatedAt = room.getRoomCreatedAt();
        this.matchCreatedAt = room.getMatchCreatedAt();
        this.isReported = room.getIsReported();
        this.reportCycle = room.getReportCycle();
        this.isPublic = room.getIsPublic();
        this.startedAt = room.getStartedAt();
        this.endedAt = room.getEndedAt();
        this.expectationStartedAt = room.getExpectationStartedAt();
        this.expectationEndedAt = room.getExpectationEndedAt();
        this.expectationPay = room.getExpectationPay();
        this.totalPay = room.getTotalPay();
    }

}
