package com.example.socket.document;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "room")
@Getter
@Setter
@NoArgsConstructor
public class Room {
    @Id
    private ObjectId id;
    private Long sellerId;
    private Long buyerId;
    private String latestMessage;

    public Room(Long sellerId, Long buyerId) {
        this.sellerId = sellerId;
        this.buyerId = buyerId;
    }
}
