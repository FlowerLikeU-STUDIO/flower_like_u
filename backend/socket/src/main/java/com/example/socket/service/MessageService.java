package com.example.socket.service;

import com.example.socket.document.Message;
import com.example.socket.dto.request.MessagePostReqDto;
import org.bson.types.ObjectId;

import java.util.List;

public interface MessageService {
    public String create(MessagePostReqDto messagePostReqDto);

    public List<Message> getList(Long storeId, Long consumerId);
}
