package com.a407.back.config;

import jakarta.servlet.http.HttpSessionEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class BrowserCloseEventListener {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @EventListener
    public void onSessionDestroyed(HttpSessionEvent event) {
        // 세션이 종료될 때 실행되는 메서드
        // 여기에 세션 종료 시 실행할 작업을 구현합니다.
        logger.info("브라우저가 닫혔습니다. 세션을 종료합니다.");
        // 여기에 자원 해제 또는 세션 관리 작업을 추가하세요.
    }
}
