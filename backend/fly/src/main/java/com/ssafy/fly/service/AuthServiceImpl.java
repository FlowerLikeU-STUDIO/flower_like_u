package com.ssafy.fly.service;

import com.ssafy.fly.common.util.FlyMailSender;
import com.ssafy.fly.common.util.RandomStringGenerator;
import com.ssafy.fly.dto.request.EmailAuthenticationReq;
import com.ssafy.fly.dto.response.MailRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service("authService")
public class AuthServiceImpl implements AuthService {

    private final RandomStringGenerator randomStringGenerator;
    private final FlyMailSender flyMailSender;

    @Autowired
    public AuthServiceImpl(RandomStringGenerator randomStringGenerator,
                           FlyMailSender flyMailSender) {
        this.randomStringGenerator = randomStringGenerator;
        this.flyMailSender = flyMailSender;
    }

    @Override
    public Map<String, Object> authenticateByEmail(String email) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        String inputEmail = email;
        String authCode = randomStringGenerator.generateRandomPassword(8);
        MailRes mail = MailRes.builder()
                .address(inputEmail)
                .title("[너닮꽃] 회원가입 인증 코드 발송")
                .message("인증 코드 : " + authCode)
                .build();

        // 추후 MailException 추가
        flyMailSender.sendEmail(mail);

        result.put("result", true);
        result.put("authCode", authCode);

        return result;
    }
}
