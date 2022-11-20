package com.ssafy.fly.service;

import com.ssafy.fly.dto.request.RegisterFeedReq;
import org.springframework.security.core.Authentication;

import java.util.Map;

public interface FeedService {
    public Map<String, Object> saveNewFeed(RegisterFeedReq registerFeedReq, Authentication authentication);
    public Map<String, Object> getFeedList(Long storeId, int pageNo, int size);
    public Map<String, Object> getFeedDetailInfo(Long feedId);
    public Map<String, Object> updateFeedInfo(Authentication authentication);
    public Map<String, Object> deleteFeedInfo(Long feedId, Authentication authentication);
}
