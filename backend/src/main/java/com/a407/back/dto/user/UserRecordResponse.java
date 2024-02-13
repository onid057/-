
package com.a407.back.dto.user;

import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserRecordResponse {

    private Long roomId;
    private String name;
    private String subCategoryName;
    private Timestamp endedAt;
    private Integer totalPay;
}