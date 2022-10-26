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
    private ObjectId id;
    private Long buyerId;
    private Long sellerId;
}
