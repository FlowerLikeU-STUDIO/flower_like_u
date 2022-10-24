package com.example.socket.service;

import com.example.socket.document.Room;
import org.bson.types.ObjectId;

import java.util.List;

public interface RoomService {
    public List<Room> getList(String userType, Long id);

    public ObjectId create(Long sellerId, Long buyerId);
}
