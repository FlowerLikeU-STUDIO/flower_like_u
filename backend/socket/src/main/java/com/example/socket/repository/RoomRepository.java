package com.example.socket.repository;

import com.example.socket.document.Room;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface RoomRepository extends MongoRepository<Room, ObjectId> {
    List<Room> findAllByStoreId(Long storeId);
    List<Room> findAllByConsumerId(Long consumerId);

    Optional<Room> findByStoreIdAndConsumerId(Long storeId, Long consumerId);

}
