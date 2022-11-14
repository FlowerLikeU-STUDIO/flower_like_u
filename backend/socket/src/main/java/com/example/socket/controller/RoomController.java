package com.example.socket.controller;

import com.example.socket.document.Room;
import com.example.socket.domain.JwtUserInfo;
import com.example.socket.domain.User;
import com.example.socket.dto.BaseResponseDto;
import com.example.socket.dto.OnlyMessageResponseDto;
import com.example.socket.dto.request.RoomCntPutReqDto;
import com.example.socket.dto.request.RoomPostReqDto;
import com.example.socket.dto.request.RoomPutReqDto;
import com.example.socket.dto.response.RoomNoLatestMessageResDto;
import com.example.socket.dto.response.RoomOnlyAddressResDto;
import com.example.socket.repository.ConsumerRepository;
import com.example.socket.repository.StoreRepository;
import com.example.socket.service.RoomService;
import com.example.socket.service.UserService;
import com.example.socket.utils.JwtConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class RoomController {
    private final RoomService roomService;
    private final UserService userService;
    @Autowired
    public RoomController(RoomService roomService, UserService userService) {
        this.roomService = roomService;
        this.userService = userService;
    }


    @PostMapping("/chatting/room")
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
        String address = roomService.create(storeId,consumerId).getId();
        return new BaseResponseDto<>("success", new RoomOnlyAddressResDto(address));
    }

    @GetMapping("/chatting/room/{opponent}")
    public BaseResponseDto<RoomNoLatestMessageResDto> getRoom(@RequestHeader(value = "Authorization") String jwt, @PathVariable("opponent") Long opponent) {
        JwtUserInfo jwtUserInfo = JwtConverter.getUserPk(jwt);
        Long storeId;
        Long consumerId;
        String opponentType;
        if (jwtUserInfo.getRole().equals("CONSUMER")) {
            consumerId = Long.parseLong(jwtUserInfo.getSub());
            storeId = opponent;
            opponentType = "STORE";
        } else {
            consumerId = opponent;
            storeId = Long.parseLong(jwtUserInfo.getSub());
            opponentType = "CONSUMER";
        }
        Optional<Room> optRoom = roomService.getOptRoom(storeId,consumerId);
        User user = userService.getUser(opponentType, opponent);
        if (optRoom.isPresent()) {
            return new BaseResponseDto<>("success", new RoomNoLatestMessageResDto(
                    optRoom.get().getId(),
                    optRoom.get().getConsumerId(),
                    optRoom.get().getStoreId(),
                    user.getImgSrc(),user.getName(),optRoom.get().getLatestMessage(),optRoom.get().getStoreNotReadCnt(),optRoom.get().getConsumerNotReadCnt(),optRoom.get().getUuid()));
        } else {
            Room room = roomService.create(storeId,consumerId);
            return new BaseResponseDto<>("success", new RoomNoLatestMessageResDto(room.getId(),consumerId,storeId,user.getImgSrc(),user.getName(), room.getLatestMessage(),room.getStoreNotReadCnt(),room.getConsumerNotReadCnt(),room.getUuid()));
        }
    }

    @PutMapping("/chatting/room")
    public OnlyMessageResponseDto updateAdd(@RequestHeader(value = "Authorization") String jwt, @RequestBody RoomPutReqDto roomPutReqDto) {
        JwtUserInfo jwtUserInfo = JwtConverter.getUserPk(jwt);
        String userType;
        if (jwtUserInfo.getRole().equals("CONSUMER"))
            userType = "store";
        else
            userType = "consumer";
        roomService.updateAdd(roomPutReqDto.getId(),roomPutReqDto.getLatestMessage(),userType, roomPutReqDto.getUuid());
        return new OnlyMessageResponseDto("success");
    }

    @PutMapping("/chatting/room/cnt")
    public OnlyMessageResponseDto resetCnt(@RequestHeader(value = "Authorization") String jwt, @RequestBody RoomCntPutReqDto roomCntPutReqDto) {
        JwtUserInfo jwtUserInfo = JwtConverter.getUserPk(jwt);
        if (jwtUserInfo.getRole().equals("CONSUMER"))
            roomCntPutReqDto.setUserType("consumer");
        else
            roomCntPutReqDto.setUserType("store");
        roomService.resetCnt(roomCntPutReqDto);
        return new OnlyMessageResponseDto("success");
    }

}
