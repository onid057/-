package com.a407.back.dto.association;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AssociationAdditionCodeRequest {

    Long userId;
    String userEmail;
    Long associationId;

}
