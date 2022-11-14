package com.ssafy.fly.controller;

import com.ssafy.fly.common.util.CustomUserDetail;
import com.ssafy.fly.common.util.JwtTokenProvider;
import com.ssafy.fly.common.util.RandomNicknameMaker;
import com.ssafy.fly.common.util.ResultMessageSet;
import com.ssafy.fly.dto.request.LoginReq;
import com.ssafy.fly.service.AuthService;
import com.ssafy.fly.service.CustomUserDetailService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final Logger logger = LogManager.getLogger(AuthController.class);

    private final AuthService authService;
    private final JwtTokenProvider jwtTokenProvider;
    private final CustomUserDetailService customUserDetailService;
    private final PasswordEncoder passwordEncoder;
    private final ResultMessageSet resultMessageSet;

    @Autowired
    public AuthController(AuthService authService,
                          JwtTokenProvider jwtTokenProvider,
                          CustomUserDetailService customUserDetailService,
                          PasswordEncoder passwordEncoder,
                          ResultMessageSet resultMessageSet) {
        this.authService = authService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.customUserDetailService = customUserDetailService;
        this.passwordEncoder = passwordEncoder;
        this.resultMessageSet = resultMessageSet;
    }

    /** 1. 이메일 인증(인증 코드 발송) */
    @PostMapping("/email")
    public ResponseEntity<Map<String, Object>> emailAuthentication(@RequestBody Map<String, Object> emailAuthReq) {
        logger.info("[GET] - /auth/email " + emailAuthReq.get("email"));

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = authService.authenticateByEmail(emailAuthReq.get("email").toString());

        if((boolean) result.get("result")) {
             response.put("result", resultMessageSet.SUCCESS);
             response.put("authCode", result.get("authCode"));
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /** 2. 일반 로그인 */
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginReq loginReq) {
        logger.info("[POST] - /auth/login " + loginReq);

        Map<String, Object> result = new HashMap<>();
        CustomUserDetail customUserDetail = customUserDetailService.loadUserByUsername(loginReq.getUserId());
        if (passwordEncoder.matches(loginReq.getPassword(), customUserDetail.getPassword())) {
            List<String> lst = new ArrayList<>();
            lst.add(customUserDetail.getUserType());
            result.put("result", resultMessageSet.SUCCESS);
            result.put("accessToken", jwtTokenProvider.createToken(customUserDetail.getUserPk(), lst));
            return new ResponseEntity<>(result, HttpStatus.OK);
            // 요청 header "Authorization : [토큰]"
        }
        throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
    }

    @GetMapping("/kakao")
    public ResponseEntity<Map<String, Object>> kakaoLogin(@RequestParam String code) {
        logger.info("[POST] - /auth/kakao");
        logger.info("[CODE] " + code);

        Map<String, Object> response = new HashMap<>();
        response.put("result", resultMessageSet.SUCCESS);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
