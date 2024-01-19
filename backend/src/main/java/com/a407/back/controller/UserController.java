package com.a407.back.controller;

import com.a407.back.dto.UserCreateRequest;
import com.a407.back.model.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @PostMapping("/")
    public ResponseEntity<Long> userSignUp(@RequestBody UserCreateRequest user) {
        Long id = userService.save(user.toEntity());
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }
}
