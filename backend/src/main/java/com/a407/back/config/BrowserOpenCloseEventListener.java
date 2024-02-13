package com.a407.back.config;

import jakarta.servlet.http.HttpSessionEvent;
import jakarta.servlet.http.HttpSessionListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class BrowserOpenCloseEventListener implements HttpSessionListener {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public void sessionCreated(HttpSessionEvent se) {
        logger.info("브라우저가 열렸습니다. 새로운 세션이 생성되었습니다.");
        // 브라우저가 열릴 때 수행할 작업을 여기에 추가하세요.
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        logger.info("브라우저가 닫혔습니다. 세션을 종료합니다.");
        // 브라우저가 닫힐 때 수행할 작업을 여기에 추가하세요.
    }
}
