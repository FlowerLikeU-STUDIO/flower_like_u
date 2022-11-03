package com.ssafy.fly.service;

import com.ssafy.fly.dto.request.RegisterFeedReq;

import java.util.Map;

public interface FeedService {
    public Map<String, Object> saveNewFeed(RegisterFeedReq registerFeedReq);
}
