package com.example.socket.service;

import com.example.socket.document.Room;
import org.bson.types.ObjectId;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

public interface RoomService {
    public List<Room> getList(String userType, Long id);

    public ObjectId create(Long sellerId, Long buyerId);

    public Optional<Room> getOptRoom(Long sellerId, Long buyerId);

    public void updateLatestMessage(Long sellerId, Long buyerId, String latestMessage);
}
