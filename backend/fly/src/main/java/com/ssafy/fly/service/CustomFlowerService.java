package com.ssafy.fly.service;

import com.ssafy.fly.dto.request.CustomFlowerRegReq;
import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface CustomFlowerService {
    public boolean saveCustomFlower(CustomFlowerRegReq customFlowerRegReq);
    public Map<String, Object> getCustomFlowerList(String userId, Pageable pageable, int pageNo);
    public Map<String, Object> getCustomFlowerDetails(String flowerId);
}
