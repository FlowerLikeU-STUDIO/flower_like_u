package com.example.socket.repository;

import com.example.socket.document.Message;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MessageRepository extends MongoRepository<Message, ObjectId> {
    List<Message> findAllByStoreIdAndConsumerId(Long storeId, Long consumerId);
}
