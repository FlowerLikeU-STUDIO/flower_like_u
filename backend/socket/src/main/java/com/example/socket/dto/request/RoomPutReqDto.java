package com.example.socket.dto.request;

import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;

@Getter
@Setter
public class RoomPutReqDto {
    private String id;
    private Long opponent;
    private String latestMessage;
}
