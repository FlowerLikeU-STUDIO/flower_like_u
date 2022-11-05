package com.ssafy.fly.service;

import com.ssafy.fly.dto.request.BookCustomFlowerReq;
import com.ssafy.fly.dto.request.BookFeedFlowerReq;

import java.util.Map;

public interface BookService {
    public Map<String, Object> registCustomFlowerBookInfo(BookCustomFlowerReq bookCustomFlowerReq);
    public Map<String, Object> registFeedFlowerBookInfo(BookFeedFlowerReq bookFeedFlowerReq);
    public Map<String, Object> updateBookState(Long bookId);
    public Map<String, Object> getBookInfoList(String userId, int pageNo, int size, String type);
    public Map<String, Object> getDetailBookInfo(Long bookId);
    public Map<String, Object> deleteBookInfo(Long bookId);
}
