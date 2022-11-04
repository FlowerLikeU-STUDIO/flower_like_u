package com.ssafy.fly.service;

import com.ssafy.fly.database.mysql.entity.ReviewEntity;
import com.ssafy.fly.dto.request.ReviewPostReqDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ReviewService {
    public List<ReviewEntity> getList(Long storeId, Pageable pageable);

    public void create(ReviewPostReqDto reviewPostReqDto);

    public Double getRating(Long storeId);
}
