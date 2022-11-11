package com.ssafy.fly.service;

import com.ssafy.fly.dto.request.ReviewPostReqDto;
import org.springframework.data.domain.Pageable;

import java.security.Principal;
import java.util.Map;

public interface ReviewService {
    public Map<String, Object> getList(Long storeId, Pageable pageable, Principal principal);
    public Map<String, Object> create(ReviewPostReqDto reviewPostReqDto, Principal principal);
    public Map<String, Object> getReviewInfo(Long reviewId, Principal principal);
    public Double getRating(Long storeId);
}
