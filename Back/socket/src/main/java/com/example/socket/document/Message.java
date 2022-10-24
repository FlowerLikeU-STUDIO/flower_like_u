package com.example.socket.document;

import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "message")
@Getter
@Setter
public class Message {

    @Id
    private ObjectId id;
    private String content;
    private String imgSrc;
    private Long sellerId;
    private Long buyerId;
}
