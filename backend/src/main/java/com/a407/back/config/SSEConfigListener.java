package com.a407.back.config;

import com.a407.back.model.service.SSEService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SSEConfigListener implements ApplicationListener<SSEConfig> {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    private final SSEService sseService;

    @Override
    public void onApplicationEvent(SSEConfig sseConfig) {
        sseService.send(sseConfig.getUserId());
        log.info("이벤트가 발생합니다. {}", sseConfig.getUserId());
    }
}
