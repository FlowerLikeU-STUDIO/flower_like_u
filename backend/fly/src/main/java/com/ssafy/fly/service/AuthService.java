package com.ssafy.fly.service;

import com.ssafy.fly.dto.request.EmailAuthenticationReq;

import java.util.Map;

public interface AuthService {
    public Map<String, Object> authenticateByEmail(String email);
}
