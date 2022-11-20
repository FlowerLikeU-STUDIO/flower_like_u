package com.ssafy.fly.service;

import com.ssafy.fly.dto.request.CustomFlowerRegReq;
import org.springframework.security.core.Authentication;

import java.util.Map;

public interface CustomFlowerService {
    public Map<String, Object> saveCustomFlower(CustomFlowerRegReq customFlowerRegReq, Authentication authentication);
    public Map<String, Object> getCustomFlowerList(int pageNo, int size, Authentication authentication);
    public Map<String, Object> getCustomFlowerDetails(String flowerId, Authentication authentication);
    public Map<String, Object> removeCustomFlower(String flowerId, Authentication authentication);
}
