package com.ssafy.fly.common.util;

import com.ssafy.fly.dto.response.MailRes;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FlyMailSender {
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String FROM_ADDRESS;

    @Async
    public void sendEmail(MailRes mail){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mail.getAddress());
        message.setFrom(FROM_ADDRESS);
        message.setSubject(mail.getTitle());
        message.setText(mail.getMessage());

        mailSender.send(message);
    }
}
