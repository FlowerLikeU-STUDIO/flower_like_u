package com.example.socket.controller;

import com.example.socket.document.Room;
import com.example.socket.domain.JwtUserInfo;
import com.example.socket.dto.BaseResponseDto;
import com.example.socket.dto.OnlyMessageResponseDto;
import com.example.socket.dto.request.RoomCntPutReqDto;
import com.example.socket.dto.request.RoomPostReqDto;
import com.example.socket.dto.request.RoomPutReqDto;
import com.example.socket.dto.response.RoomNoLatestMessageResDto;
import com.example.socket.dto.response.RoomOnlyAddressResDto;
import com.example.socket.service.RoomService;
import com.example.socket.utils.JwtConverter;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class RoomController {
    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @PostMapping("chatting/room")
    public BaseResponseDto<RoomOnlyAddressResDto> createRoom(@RequestHeader(value = "Authorization") String jwt, @RequestBody RoomPostReqDto roomPostReqDto) {
        JwtUserInfo jwtUserInfo = JwtConverter.getUserPk(jwt);
        Long storeId;
        Long consumerId;
        if (jwtUserInfo.getRole().equals("CONSUMER")) {
            consumerId = Long.parseLong(jwtUserInfo.getSub());
            storeId = roomPostReqDto.getOpponent();
        } else {
            consumerId = roomPostReqDto.getOpponent();
            storeId = Long.parseLong(jwtUserInfo.getSub());
        }
        String address = roomService.create(storeId,consumerId);
        return new BaseResponseDto<>("success", new RoomOnlyAddressResDto(address));
    }

    @GetMapping("chatting/room/{opponent}")
    public BaseResponseDto<RoomNoLatestMessageResDto> getRoom(@RequestHeader(value = "Authorization") String jwt, @PathVariable("opponent") Long opponent) {
        JwtUserInfo jwtUserInfo = JwtConverter.getUserPk(jwt);
        Long storeId;
        Long consumerId;
        if (jwtUserInfo.getRole().equals("CONSUMER")) {
            consumerId = Long.parseLong(jwtUserInfo.getSub());
            storeId = opponent;
        } else {
            consumerId = opponent;
            storeId = Long.parseLong(jwtUserInfo.getSub());
        }
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

    @PutMapping("chatting/room")
    public OnlyMessageResponseDto updateAdd(@RequestHeader(value = "Authorization") String jwt, @RequestBody RoomPutReqDto roomPutReqDto) {
        JwtUserInfo jwtUserInfo = JwtConverter.getUserPk(jwt);
        Long storeId;
        Long consumerId;
        String userType;
        if (jwtUserInfo.getRole().equals("CONSUMER")) {
            consumerId = Long.parseLong(jwtUserInfo.getSub());
            storeId = roomPutReqDto.getOpponent();
            userType = "store";
        } else {
            consumerId = roomPutReqDto.getOpponent();
            storeId = Long.parseLong(jwtUserInfo.getSub());
            userType = "consumer";
        }
        roomService.updateAdd(storeId,consumerId,roomPutReqDto.getLatestMessage(),userType);
        return new OnlyMessageResponseDto("success");
    }

    @PutMapping("chatting/room/cnt")
    public OnlyMessageResponseDto resetCnt(@RequestHeader(value = "Authorization") String jwt, @RequestBody RoomCntPutReqDto roomCntPutReqDto) {
        JwtUserInfo jwtUserInfo = JwtConverter.getUserPk(jwt);
        Long storeId;
        Long consumerId;
        if (jwtUserInfo.getRole().equals("CONSUMER")) {
            consumerId = Long.parseLong(jwtUserInfo.getSub());
            storeId = roomCntPutReqDto.getOpponent();
            roomCntPutReqDto.setUserType("consumer");
        } else {
            consumerId = roomCntPutReqDto.getOpponent();
            storeId = Long.parseLong(jwtUserInfo.getSub());
            roomCntPutReqDto.setUserType("store");
        }
        roomCntPutReqDto.setConsumerId(consumerId);
        roomCntPutReqDto.setStoreId(storeId);
        roomService.resetCnt(roomCntPutReqDto);
        return new OnlyMessageResponseDto("success");
    }

}
