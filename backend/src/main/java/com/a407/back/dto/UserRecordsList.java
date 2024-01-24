package com.a407.back.dto;

import com.a407.back.domain.Room;
import java.sql.Timestamp;
import lombok.Getter;

@Getter
public class UserRecordsList {

    private final Long zipsaId;
    private final String name;
    private final String profile;
    private final String subCategoryName;
    private final String majorCategoryName;
    private final String content;
    private final int estimateDuration;
    private final Timestamp roomCreatedAt;
    private final Timestamp matchCreatedAt;
    private final boolean isReported;
    private final int reportCycle;
    private final boolean isPublic;
    private final Timestamp startedAt;
    private final Timestamp endedAt;
    private final Timestamp expectationStartedAt;
    private final Timestamp expectationEndedAt;
    private final int expectationPay;
    private final int totalPay;
    private final boolean isComplained;
    private final boolean isReviewed;

    public UserRecordsList(Room room) {
        this.zipsaId = room.getZipsaId().getZipsaId().getUserId();
        this.name = room.getZipsaId().getZipsaId().getName();
        if (room.getZipsaId().getZipsaId().getProfileImage() == null) {
            this.profile = null;
        } else {
            this.profile = new String(room.getZipsaId().getZipsaId().getProfileImage());
        }
        this.subCategoryName = room.getSubCategoryId().getName();
        this.majorCategoryName = room.getSubCategoryId().getMajorCategoryId().getName();
        this.content = room.getContent();
        this.estimateDuration = room.getEstimateDuration();
        this.roomCreatedAt = room.getRoomCreatedAt();
        this.matchCreatedAt = room.getMatchCreatedAt();
        this.isReported = room.isReported();
        this.reportCycle = room.getReportCycle();
        this.isPublic = room.isPublic();
        this.startedAt = room.getStartedAt();
        this.endedAt = room.getEndedAt();
        this.expectationStartedAt = room.getExpectationStartedAt();
        this.expectationEndedAt = room.getExpectationEndedAt();
        this.expectationPay = room.getExpectationPay();
        this.totalPay = room.getTotalPay();
        this.isComplained = room.isComplained();
        this.isReviewed = room.isReviewed();
    }
}