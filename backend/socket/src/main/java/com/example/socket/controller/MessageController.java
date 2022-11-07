package com.example.socket.controller;

import com.example.socket.document.Message;
import com.example.socket.document.Room;
import com.example.socket.domain.JwtUserInfo;
import com.example.socket.dto.BaseResponseDto;
import com.example.socket.dto.OnlyMessageResponseDto;
import com.example.socket.dto.request.MessagePostReqDto;
import com.example.socket.service.MessageService;
import com.example.socket.service.RoomService;
import com.example.socket.utils.JwtConverter;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@RestController
public class MessageController {

    private final MessageService messageService;
    private final RoomService roomService;

    @Autowired
    public MessageController(MessageService messageService, RoomService roomService) {

        this.messageService = messageService;
        this.roomService = roomService;
    }


    @PostMapping("chatting")
    public BaseResponseDto<String> createMessage(@RequestHeader(value = "Authorization") String jwt, @RequestBody MessagePostReqDto messagePostReqDto) {
        JwtUserInfo jwtUserInfo = JwtConverter.getUserPk(jwt);
        Long storeId;
        Long consumerId;
        if (jwtUserInfo.getRole().equals("CONSUMER")) {
            consumerId = Long.parseLong(jwtUserInfo.getSub());
            storeId = messagePostReqDto.getOpponent();
            messagePostReqDto.setDirection("consumer");
        } else {
            consumerId = messagePostReqDto.getOpponent();
            storeId = Long.parseLong(jwtUserInfo.getSub());
            messagePostReqDto.setDirection("store");
        }
        messagePostReqDto.setConsumerId(consumerId);
        messagePostReqDto.setStoreId(storeId);
        String id = messageService.create(messagePostReqDto);
        return new BaseResponseDto<>("success",id);
    }

    @GetMapping("chatting/room/list")
    public BaseResponseDto<List<Room>> getRoomList(@RequestHeader(value = "Authorization") String jwt) {
        JwtUserInfo jwtUserInfo = JwtConverter.getUserPk(jwt);
        List<Room> roomList = roomService.getList(jwtUserInfo.getRole(), Long.parseLong(jwtUserInfo.getSub()));
        return new BaseResponseDto<>("success", roomList);
    }

    @GetMapping("chatting/message/{address}")
    public BaseResponseDto<List<Message>> getMessageList(@PathVariable("address") String address) {

        List<Message> messageList = messageService.getList(address);
        return new BaseResponseDto<>("success", messageList);
    }

    @GetMapping("chatting/{id}")
    public BaseResponseDto<String> getImgSrc(@PathVariable("id") String id) {
        return new BaseResponseDto<>("success",messageService.getImgSrc(id));
    }
}
