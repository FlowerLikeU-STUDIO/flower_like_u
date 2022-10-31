/**
 * 안 쓰는 코드 - 지울 것
 */

package com.ssafy.fly.service;

import com.ssafy.fly.dto.response.MailRes;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MailSendService {
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private static String FROM_ADDRESS;

    @Async
    public void sendEmail(MailRes mail){
        System.out.println("+++++++++++++");
        System.out.println(FROM_ADDRESS);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mail.getAddress());
        message.setFrom(FROM_ADDRESS);
        message.setSubject(mail.getTitle());
        message.setText(mail.getMessage());

        mailSender.send(message);
    }

}
