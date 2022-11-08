package com.example.socket.service;

import com.example.socket.document.Room;
import com.example.socket.dto.request.RoomCntPutReqDto;
import org.bson.types.ObjectId;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

public interface RoomService {
    public List<Room> getList(String userType, Long id);

    public String create(Long storeId, Long consumerId);

    public Optional<Room> getOptRoom(Long storeId, Long consumerId);

    public void updateAdd(String id, String latestMessage, String userType);

    public void resetCnt(RoomCntPutReqDto roomCntPutReqDto);
}
