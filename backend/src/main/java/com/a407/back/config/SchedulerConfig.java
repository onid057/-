package com.a407.back.config;

import com.a407.back.model.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SchedulerConfig {

    private final RoomService roomService;

    @Scheduled(cron = "0 0 * * * *")
    public void callDeleteRoom() {
        roomService.deleteRegularPeriodRoom();
    }

}
