package com.example.socket.controller;

import com.example.socket.document.Room;
import com.example.socket.dto.BaseResponseDto;
import com.example.socket.dto.OnlyMessageResponseDto;
import com.example.socket.dto.request.RoomCntPutReqDto;
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
        Long storeId = roomPostReqDto.getStoreId();
        Long consumerId = roomPostReqDto.getConsumerId();
        String address = roomService.create(storeId,consumerId);
        return new BaseResponseDto<>("success", new RoomOnlyAddressResDto(address));
    }

    @GetMapping("api/chatting/room/{storeId}/{consumerId}")
    public BaseResponseDto<RoomNoLatestMessageResDto> getRoom(@PathVariable("consumerId") Long consumerId, @PathVariable("storeId") Long storeId) {
        Optional<Room> optRoom = roomService.getOptRoom(storeId,consumerId);
        if (optRoom.isPresent())
            return new BaseResponseDto<>("success",new RoomNoLatestMessageResDto(
                    optRoom.get().getId(),
                    optRoom.get().getStoreId(),
                    optRoom.get().getConsumerId()));
        else {
            String address = roomService.create(storeId,consumerId);
            return new BaseResponseDto<>("success", new RoomNoLatestMessageResDto(address,consumerId,storeId));
        }
    }

    @PutMapping("api/chatting/room")
    public OnlyMessageResponseDto updateAdd(@RequestBody RoomPutReqDto roomPutReqDto) {
        roomService.updateAdd(roomPutReqDto.getStoreId(),roomPutReqDto.getConsumerId(),roomPutReqDto.getLatestMessage(),roomPutReqDto.getUserType());
        return new OnlyMessageResponseDto("success");
    }

    @PutMapping("api/chatting/room/cnt")
    public OnlyMessageResponseDto resetCnt(@RequestBody RoomCntPutReqDto roomCntPutReqDto) {
        roomService.resetCnt(roomCntPutReqDto);
        return new OnlyMessageResponseDto("success");
    }

}
