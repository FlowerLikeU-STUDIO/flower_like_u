package com.example.socket.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;

import java.math.BigInteger;

@Getter
@Setter
@AllArgsConstructor
public class RoomNoLatestMessageResDto {
    private String id;
    private Long consumerId;
    private Long storeId;
}
