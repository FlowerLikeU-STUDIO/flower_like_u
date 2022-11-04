package com.ssafy.fly.controller;

import com.ssafy.fly.common.util.JwtTokenProvider;
import com.ssafy.fly.dto.request.LoginReq;
import com.ssafy.fly.service.CustomUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final JwtTokenProvider jwtTokenProvider;
    private final CustomUserDetailService customUserDetailService;

    @Autowired
    public AuthController(JwtTokenProvider jwtTokenProvider, CustomUserDetailService customUserDetailService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.customUserDetailService = customUserDetailService;
    }


    @GetMapping("/test/{text}")
    public ResponseEntity<Map<String, Object>> test(@PathVariable String text) {
        System.out.println("[GET] - /auth/test" + text);

        Map<String, Object> result = new HashMap<>();
        result.put("param", text);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginReq loginReq) {
        System.out.println("[POST] - /auth/login " + loginReq);

        Map<String, Object> result = new HashMap<>();
        UserDetails userDetails = customUserDetailService.loadUserByUsername(loginReq.getUserId());
        List<String> lst = new ArrayList<>();
        lst.add("USER");
        result.put("response",jwtTokenProvider.createToken(userDetails.getUsername(), lst));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
