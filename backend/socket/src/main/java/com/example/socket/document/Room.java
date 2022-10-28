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
    private Long storeId;
    private Long consumerId;
    private String latestMessage;
    private int storeNotReadCnt;
    private int consumerNotReadCnt;

    public Room(Long storeId, Long consumerId) {
        this.storeId = storeId;
        this.consumerId = consumerId;
        this.storeNotReadCnt = 0;
        this.consumerNotReadCnt = 0;
        this.latestMessage = "";
    }
}
