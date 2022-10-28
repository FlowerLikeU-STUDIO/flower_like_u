package com.example.socket.dto.request;

import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;

@Getter
@Setter
public class RoomPutReqDto {
    private ObjectId id;
    private Long consumerId;
    private Long storeId;
    private String latestMessage;
    private String userType;
}
