package com.a407.back.controller;

import com.a407.back.config.constants.SuccessCode;
import com.a407.back.dto.association.AssociationAdditionCodeResponse;
import com.a407.back.dto.association.AssociationChangeRepresentativeRequest;
import com.a407.back.dto.association.AssociationChangeRequest;
import com.a407.back.dto.user.UserAssociationResponse;
import com.a407.back.dto.util.ApiResponse;
import com.a407.back.dto.util.SecurityUser;
import com.a407.back.model.service.AssociationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/associations")
public class AssociationController {

    private final AssociationService associationService;

    @PostMapping
    public ResponseEntity<ApiResponse<String>> makeAssociation(
        @AuthenticationPrincipal SecurityUser user) {
        associationService.makeAssociation(user.getUserId());
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(new ApiResponse<>(SuccessCode.INSERT_SUCCESS, "연동 계정 생성 성공"));
    }


    @GetMapping
    public ResponseEntity<ApiResponse<List<UserAssociationResponse>>> getAssociationUserList(
        @AuthenticationPrincipal SecurityUser user) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                associationService.getAssociationUserList(
                    user.getAssociationId().getAssociationId())));
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<String>> deleteAssociation(
        @AuthenticationPrincipal SecurityUser user) {
        associationService.deleteAssociation(user.getUserId());
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.DELETE_SUCCESS, "연동 계정 삭제 성공"));
    }


    @PostMapping("/addition")
    public ResponseEntity<ApiResponse<AssociationAdditionCodeResponse>> makeAdditionCode(
        @AuthenticationPrincipal SecurityUser user)
        throws NoSuchAlgorithmException, JsonProcessingException {
        return ResponseEntity.status(HttpStatus.CREATED).body(
            new ApiResponse<>(SuccessCode.INSERT_SUCCESS,
                associationService.makeAdditionCode(user.getUserId(), user.getEmail(),
                    user.getAssociationId().getAssociationId())));
    }

    @PostMapping("/participate")
    public ResponseEntity<ApiResponse<String>> changeAddition(
        @AuthenticationPrincipal SecurityUser user,
        @RequestBody AssociationChangeRequest request) {
        associationService.changeAssociation(user.getUserId(), request.getCode());
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(new ApiResponse<>(SuccessCode.INSERT_SUCCESS, "연동 계정 참가 성공"));
    }

    @PatchMapping("/representative")
    public ResponseEntity<ApiResponse<String>> changeAssociationRepresentative(
        @AuthenticationPrincipal SecurityUser user,
        @RequestBody AssociationChangeRepresentativeRequest request) {
        associationService.changeAssociationRepresentative(user.getUserId(),
            request.getUserId());
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.UPDATE_SUCCESS, "연동 계정 대표 변경 성공"));
    }

}
