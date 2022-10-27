package com.example.socket.dto.request;

import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;

@Getter
@Setter
public class RoomPutReqDto {
    private ObjectId id;
    private Long buyerId;
    private Long sellerId;
    private String latestMessage;
}
