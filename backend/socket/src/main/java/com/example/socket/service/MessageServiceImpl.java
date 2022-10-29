package com.example.socket.service;

import com.example.socket.document.Message;
import com.example.socket.dto.request.MessagePostReqDto;
import com.example.socket.repository.MessageRepository;
import org.bson.types.ObjectId;
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

    public String create(MessagePostReqDto messagePostReqDto) {
        Message message = new Message();
        message.setContent(messagePostReqDto.getContent());
        message.setDirection(messagePostReqDto.getDirection());
        message.setConsumerId(messagePostReqDto.getConsumerId());
        List<String> imgSrc = messagePostReqDto.getImgSrc();
        String string = String.join("`",imgSrc);
        message.setImgSrc(string);
        message.setStoreId(messagePostReqDto.getStoreId());
        try{
            return messageRepository.save(message).getId();
        }catch(Exception e){
            throw new IllegalArgumentException("메세지 보내기에 실패했습니다.");
        }
    }

    public List<Message> getList(Long storeId, Long consumerId) {
        return messageRepository.findAllByStoreIdAndConsumerId(storeId,consumerId);
    }
}
