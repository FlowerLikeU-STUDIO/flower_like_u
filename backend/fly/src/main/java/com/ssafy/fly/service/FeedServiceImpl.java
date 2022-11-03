package com.ssafy.fly.service;

import com.ssafy.fly.database.mysql.repository.FeedRepository;
import com.ssafy.fly.dto.request.RegisterFeedReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Map;

@Service("feedService")
@Transactional
public class FeedServiceImpl implements FeedService {

    private final FeedRepository feedRepository;

    @Autowired
    public FeedServiceImpl(FeedRepository feedRepository) {
        this.feedRepository = feedRepository;
    }

    @Override
    public Map<String, Object> saveNewFeed(RegisterFeedReq registerFeedReq) {
        String storeId = registerFeedReq.getStoreId();
        registerFeedReq.getName();
        registerFeedReq.getPrice();
        registerFeedReq.getContent();
        registerFeedReq.getImage();
        return null;
    }
}
