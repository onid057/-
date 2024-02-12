package com.a407.back.config;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class SSEConfig extends ApplicationEvent {

    private final Long userId;

    public SSEConfig(Long userId) {
        super(userId);
        this.userId = userId;
    }
}
