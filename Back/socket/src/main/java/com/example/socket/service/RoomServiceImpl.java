package com.example.socket.service;

import com.example.socket.document.Room;
import com.example.socket.repository.RoomRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;

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

    public Optional<Room> getOptRoom(Long sellerId, Long buyerId) {
        return roomRepository.findBySellerIdAndBuyerId(sellerId, buyerId);
    }

    @Transactional
    public void updateLatestMessage(Long sellerId, Long buyerId, String latestMessage) {
        Room room = roomRepository.findBySellerIdAndBuyerId(sellerId,buyerId).orElseThrow(new Supplier<IllegalArgumentException>() {
            @Override
            public IllegalArgumentException get() {
                return new IllegalArgumentException("해당 방이 없습니다.");
            }
        });
        room.setLatestMessage(latestMessage);
        try {
            roomRepository.save(room);
        } catch(Exception e) {
            throw new IllegalArgumentException("최신 메세지 갱신에 실패했습니다.");
        }
    }


}
