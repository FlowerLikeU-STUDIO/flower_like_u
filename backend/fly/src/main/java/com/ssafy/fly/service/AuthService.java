package com.ssafy.fly.service;

import java.util.Map;

public interface AuthService {
    public Map<String, Object> authenticateByEmail(String email);
}
