package com.a407.back.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Table(name = "ZIPSA")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Zipsa {

    @Id
    @OneToOne
    @JoinColumn(name = "zipsa_id")
    private User zipsaId;

    @OneToOne
    @ColumnDefault("1")
    @JoinColumn(name = "grade_id", nullable = false)
    private Grade gradeId;

    @Column(name = "description", nullable = false, length = 100)
    private String description;

    @Column(name = "account", nullable = false, length = 20)
    private String account;

    @ColumnDefault("false")
    @Column(name = "is_worked", nullable = false)
    private Boolean isWorked;

    @Column(name = "prefer_tag", nullable = false, length = 100)
    private String preferTag;

    @ColumnDefault("0")
    @Column(name = "service_count")
    private int serviceCount;

    @ColumnDefault("0")
    @Column(name = "reply_average")
    private Double replyAverage;

    @ColumnDefault("0")
    @Column(name = "reply_count")
    private int replyCount;

    @ColumnDefault("0")
    @Column(name = "kindness_average", nullable = false)
    private Double kindnessAverage;

    @ColumnDefault("0")
    @Column(name = "skill_average", nullable = false)
    private Double skillAverage;

    @ColumnDefault("0")
    @Column(name = "rewind_average", nullable = false)
    private Double rewindAverage;

    @Builder
    public Zipsa(User zipsaId, Grade gradeId, String description, String account, Boolean isWorked,
        String preferTag, int serviceCount, Double replyAverage, int replyCount,
        Double kindnessAverage, Double skillAverage, Double rewindAverage) {
        this.zipsaId = zipsaId;
        this.gradeId = gradeId;
        this.description = description;
        this.account = account;
        this.isWorked = isWorked;
        this.preferTag = preferTag;
        this.serviceCount = serviceCount;
        this.replyAverage = replyAverage;
        this.replyCount = replyCount;
        this.kindnessAverage = kindnessAverage;
        this.skillAverage = skillAverage;
        this.rewindAverage = rewindAverage;
    }
}
