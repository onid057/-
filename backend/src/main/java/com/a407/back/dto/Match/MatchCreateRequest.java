package com.a407.back.dto.Match;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MatchCreateRequest {

    private long notificationId;
    private long roomId;
}
