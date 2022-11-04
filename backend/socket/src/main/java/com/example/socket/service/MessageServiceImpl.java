package com.example.socket.service;

import com.example.socket.document.Message;
import com.example.socket.document.Room;
import com.example.socket.dto.request.MessagePostReqDto;
import com.example.socket.repository.MessageRepository;
import com.example.socket.repository.RoomRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Supplier;

@Service
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final RoomRepository roomRepository;

    @Autowired
    public MessageServiceImpl(MessageRepository messageRepository, RoomRepository roomRepository) {
        this.messageRepository = messageRepository;
        this.roomRepository = roomRepository;
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

    public List<Message> getList(String address) {
        Room room = roomRepository.findById(address).orElseThrow(() -> new IllegalArgumentException("해당 방이 없습니다."));
        return messageRepository.findAllByStoreIdAndConsumerId(room.getStoreId(), room.getConsumerId());
    }

    public String getImgSrc(String id) {
        return messageRepository.findById(id).orElseThrow(new Supplier<IllegalArgumentException>() {
            @Override
            public IllegalArgumentException get() {
                return new IllegalArgumentException("해당 메세지가 없습니다.");
            }
        }).getImgSrc();
    }
}
