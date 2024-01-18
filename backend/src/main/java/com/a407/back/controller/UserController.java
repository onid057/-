package com.a407.back.controller;

import com.a407.back.dto.UserRequest;
import com.a407.back.model.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService basicService;

    @PostMapping("/post")
    public ResponseEntity<Long> postMethod(@RequestBody UserRequest user) {
        Long id = basicService.save(user.toEntity());
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }
}
