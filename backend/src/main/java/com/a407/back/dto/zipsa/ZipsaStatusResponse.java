package com.a407.back.dto.zipsa;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ZipsaStatusResponse {

    private Long zipsaId;
    private Boolean isWorked;

}
