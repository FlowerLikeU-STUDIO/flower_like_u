package com.example.socket.service;

import com.example.socket.document.Message;

import java.util.List;

public interface MessageService {
    public void create(Message message);

    public List<Message> getList(Long storeId, Long consumerId);
}
