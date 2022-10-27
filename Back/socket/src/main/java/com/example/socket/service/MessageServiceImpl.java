package com.example.socket.service;

import com.example.socket.document.Message;
import com.example.socket.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;

    @Autowired
    public MessageServiceImpl(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public void create(Message message) {
        try{
            messageRepository.save(message);
        }catch(Exception e){
            throw new IllegalArgumentException("메세지 보내기에 실패했습니다.");
        }
    }

    public List<Message> getList(Long sellerId, Long buyerId) {
        return messageRepository.findAllBySellerIdAndBuyerId(sellerId,buyerId);
    }
}
