package com.ssafy.fly.service;

import com.ssafy.fly.dto.request.CustomFlowerRegReq;
import org.springframework.data.domain.Pageable;

import java.security.Principal;
import java.util.Map;

public interface CustomFlowerService {
    public Map<String, Object> saveCustomFlower(CustomFlowerRegReq customFlowerRegReq, Principal principal);
    public Map<String, Object> getCustomFlowerList(int pageNo, int size, Principal principal);
    public Map<String, Object> getCustomFlowerDetails(String flowerId, Principal principal);
    public Map<String, Object> removeCustomFlower(String flowerId, Principal principal);
}
