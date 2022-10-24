package com.example.socket.controller;

import com.example.socket.document.Room;
import com.example.socket.dto.BaseResponseDto;
import com.example.socket.dto.request.RoomPostReqDto;
import com.example.socket.repository.RoomRepository;
import com.example.socket.service.RoomService;
import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RoomController {
    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @PostMapping("api/chatting/room")
    public BaseResponseDto<Room> createRoom(@RequestBody RoomPostReqDto roomPostReqDto) {
        Long sellerId = roomPostReqDto.getSellerId();
        Long buyerId = roomPostReqDto.getBuyerId();
        ObjectId address = roomService.create(sellerId,buyerId);
        return new BaseResponseDto<>("success",);
    }
}
