package com.ssafy.fly.service;

import com.ssafy.fly.dto.request.ReviewPostReqDto;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;

import java.util.Map;

public interface ReviewService {
    public Map<String, Object> getList(Long storeId, Pageable pageable);
    public Map<String, Object> create(ReviewPostReqDto reviewPostReqDto, Authentication authentication);
    public Map<String, Object> getReviewInfo(Long reviewId, Authentication authentication);
}
