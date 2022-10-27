package com.example.socket.controller;

import com.example.socket.document.Message;
import com.example.socket.document.Room;
import com.example.socket.dto.BaseResponseDto;
import com.example.socket.dto.OnlyMessageResponseDto;
import com.example.socket.service.MessageService;
import com.example.socket.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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


    @PostMapping("/api/chatting")
    public OnlyMessageResponseDto createMessage(@RequestBody Message message) {
        messageService.create(message);
        return new OnlyMessageResponseDto("success");
    }

    @GetMapping("/api/chatting/room/list/{userType}/{id}")
    public BaseResponseDto<List<Room>> getRoomList(@PathVariable("userType") String userType, @PathVariable("id") Long id) {
        List<Room> roomList = roomService.getList(userType, id);
        return new BaseResponseDto<>("success", roomList);
    }

    @GetMapping("/api/chatting/{sellerId}/{buyerId}")
    public BaseResponseDto<List<Message>> getMessageList(@PathVariable("sellerId") Long sellerId, @PathVariable("buyerId") Long buyerId) {
        List<Message> messageList = messageService.getList(sellerId,buyerId);
        return new BaseResponseDto<>("success", messageList);
    }
}
