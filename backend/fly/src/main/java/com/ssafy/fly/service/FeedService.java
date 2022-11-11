package com.ssafy.fly.service;

import com.ssafy.fly.dto.request.RegisterFeedReq;

import java.security.Principal;
import java.util.Map;

public interface FeedService {
    public Map<String, Object> saveNewFeed(RegisterFeedReq registerFeedReq, Principal principal);
    public Map<String, Object> getFeedList(Long storeId, int pageNo, int size);
    public Map<String, Object> getFeedDetailInfo(Long feedId);
    public Map<String, Object> updateFeedInfo(Principal principal);
    public Map<String, Object> deleteFeedInfo(Long feedId, Principal principal);
}
