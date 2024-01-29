package com.a407.back.controller;

import com.a407.back.config.constants.SuccessCode;
import com.a407.back.dto.util.ApiResponse;
import com.a407.back.model.service.AssociationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/associations")
public class AssociationController {

    private final AssociationService associationService;

    @PostMapping
    public ApiResponse<String> makeAssociation(){
        associationService.makeAssociation(7L);
        return  new ApiResponse<>(SuccessCode.INSERT_SUCCESS,"연동 계정 생성 성공");
    }





}
