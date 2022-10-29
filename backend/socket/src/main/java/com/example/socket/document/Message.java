package com.example.socket.document;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Document(collection = "message")
@Getter
@Setter
@NoArgsConstructor
public class Message {

    @Id
    private String id;
    private String content;
    private String imgSrc;
    private Long storeId;
    private Long consumerId;
    private String direction;
}
