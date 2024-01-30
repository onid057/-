package com.a407.back.dto.association;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AssociationAdditionCodeResponse {

    private String additionCode;
    private int leftTime;

}
