package com.a407.back.config;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class MessageConfig {

    @Value("${sms.api.key}")
    private String API_KEY;

    @Value("${sms.api.secret}")
    private String SECRET;

    @Bean
    public DefaultMessageService messageService(){
        return NurigoApp.INSTANCE.initialize(API_KEY, SECRET, "https://api.coolsms.co.kr");
    }

}