package com.example.socket.service;

import com.example.socket.document.Room;
import com.example.socket.repository.RoomRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomServiceImpl implements RoomService{

    private final RoomRepository roomRepository;

    @Autowired
    public RoomServiceImpl(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public List<Room> getList(String userType, Long id) {
        List<Room> RoomList;
        if (userType.equals("buyer"))
            RoomList = roomRepository.findAllByBuyerId(id);
        else
            RoomList = roomRepository.findAllBySellerId(id);
        return RoomList;
    }

    public ObjectId create(Long sellerId, Long buyerId) {
        try {
            return roomRepository.save(new Room(sellerId,buyerId)).getId();
        } catch (Exception e) {
            throw new IllegalArgumentException("방 생성에 실패했습니다.");
        }
    }
}
