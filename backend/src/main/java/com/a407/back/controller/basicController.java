package com.a407.back.controller;

import com.a407.back.dto.UserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.a407.back.model.service.basicService;


@RequiredArgsConstructor
@RestController
public class basicController {
    private final basicService basicService;

    @PostMapping("/post")
    public ResponseEntity<Integer> postMethod(@RequestBody UserRequest user) {
        int id = basicService.save(user.toEntity());
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }
}
