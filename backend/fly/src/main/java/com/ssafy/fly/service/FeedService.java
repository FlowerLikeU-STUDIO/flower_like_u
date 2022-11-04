package com.ssafy.fly.service;

import com.ssafy.fly.dto.request.RegisterFeedReq;

import java.util.Map;

public interface FeedService {
    public Map<String, Object> saveNewFeed(RegisterFeedReq registerFeedReq);
    public Map<String, Object> getFeedList(String userId, Long storeId, int pageNo, int size);
    public Map<String, Object> getFeedDetailInfo(Long feedId);
    public Map<String, Object> updateFeedInfo();
    public Map<String, Object> deleteFeedInfo(Long feedId);
}
