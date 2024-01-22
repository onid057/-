package com.a407.back.dto;

import com.a407.back.domain.Zipsa;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;

@Getter
public class UserNearZipsaResponse {

    private final List<UserNearZipsaList> list;


    public UserNearZipsaResponse(List<Zipsa> list) {
        this.list = new ArrayList<>();
        for (Zipsa zipsa : list) {
            this.list.add(new UserNearZipsaList(zipsa));
        }
    }
}
