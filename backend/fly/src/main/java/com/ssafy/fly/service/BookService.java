package com.ssafy.fly.service;

import com.ssafy.fly.dto.request.BookCustomFlowerReq;
import com.ssafy.fly.dto.request.BookFeedFlowerReq;
import org.springframework.security.core.Authentication;

import java.util.Map;

public interface BookService {
    public Map<String, Object> registCustomFlowerBookInfo(BookCustomFlowerReq bookCustomFlowerReq, Authentication authentication);
    public Map<String, Object> registFeedFlowerBookInfo(BookFeedFlowerReq bookFeedFlowerReq, Authentication authentication);
    public Map<String, Object> updateBookState(Long bookId, Authentication authentication);
    public Map<String, Object> getBookInfoList(int pageNo, int size, String type, Authentication authentication);
    public Map<String, Object> getDetailBookInfo(Long bookId, Authentication authentication);
    public Map<String, Object> deleteBookInfo(Long bookId, Authentication authentication);
}
