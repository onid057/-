package com.a407.back.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private int id;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Builder
    public User(int id, String password, String email) {
        this.id = id;
        this.password = password;
        this.email = email;
    }
}
