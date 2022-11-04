package com.example.socket.repository;

import com.example.socket.document.Message;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findAllByStoreIdAndConsumerId(Long storeId, Long consumerId);
    Optional<Message> findById(String id);
}
