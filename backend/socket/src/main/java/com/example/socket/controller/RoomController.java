package com.example.socket.controller;

import com.example.socket.document.Room;
import com.example.socket.dto.BaseResponseDto;
import com.example.socket.dto.OnlyMessageResponseDto;
import com.example.socket.dto.request.RoomPostReqDto;
import com.example.socket.dto.request.RoomPutReqDto;
import com.example.socket.dto.response.RoomNoLatestMessageResDto;
import com.example.socket.dto.response.RoomOnlyAddressResDto;
import com.example.socket.service.RoomService;
import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class RoomController {
    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @PostMapping("api/chatting/room")
    public BaseResponseDto<RoomOnlyAddressResDto> createRoom(@RequestBody RoomPostReqDto roomPostReqDto) {
        Long sellerId = roomPostReqDto.getSellerId();
        Long buyerId = roomPostReqDto.getBuyerId();
        ObjectId address = roomService.create(sellerId,buyerId);
        return new BaseResponseDto<>("success", new RoomOnlyAddressResDto(address));
    }

    @GetMapping("api/chatting/room/{sellerId}/{buyerId}")
    public BaseResponseDto<RoomNoLatestMessageResDto> getRoom(@PathVariable("buyerId") Long buyerId, @PathVariable("sellerId") Long sellerId) {
        Optional<Room> optRoom = roomService.getOptRoom(sellerId,buyerId);
        if (optRoom.isPresent())
            return new BaseResponseDto<>("success",new RoomNoLatestMessageResDto(
                    optRoom.get().getId(),
                    optRoom.get().getBuyerId(),
                    optRoom.get().getSellerId()));
        else {
            ObjectId address = roomService.create(sellerId,buyerId);
            return new BaseResponseDto<>("success", new RoomNoLatestMessageResDto(address,buyerId,sellerId));
        }
    }

    @PutMapping("api/chatting/room")
    public OnlyMessageResponseDto updateLatestMessage(@RequestBody RoomPutReqDto roomPutReqDto) {
        roomService.updateLatestMessage(roomPutReqDto.getSellerId(),roomPutReqDto.getBuyerId(),roomPutReqDto.getLatestMessage());
        return new OnlyMessageResponseDto("success");
    }
}
