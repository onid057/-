package com.a407.back.dto.zipsa;

import com.a407.back.domain.User.Gender;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import org.joda.time.DateTime;

@Getter
@Builder
public class ZipsaDetailInfoResponse {

    private String name;
    private String email;
    private String phoneNumber;
    private DateTime birth;
    private Gender gender;
    private String address;
    private String profileImage;
    private Double latitude;
    private Double longitude;
    private Long gradeId;
    private String gradeName;
    private int salary;
    private String description;
    private String preferTag;
    private int serviceCount;
    private Double replyAverage;
    private int replyCount;
    private Double kindnessAverage;
    private Double skillAverage;
    private Double rewindAverage;
    private List<String> subCategory;

}
