package com.ssafy.fly.service;

import com.ssafy.fly.dto.request.BookCustomFlowerReq;
import com.ssafy.fly.dto.request.BookFeedFlowerReq;

import java.security.Principal;
import java.util.Map;

public interface BookService {
    public Map<String, Object> registCustomFlowerBookInfo(BookCustomFlowerReq bookCustomFlowerReq, Principal principal);
    public Map<String, Object> registFeedFlowerBookInfo(BookFeedFlowerReq bookFeedFlowerReq, Principal principal);
    public Map<String, Object> updateBookState(Long bookId, Principal principal);
    public Map<String, Object> getBookInfoList(int pageNo, int size, String type, Principal principal);
    public Map<String, Object> getDetailBookInfo(Long bookId, Principal principal);
    public Map<String, Object> deleteBookInfo(Long bookId, Principal principal);
}
