package com.example.socket.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;

import java.math.BigInteger;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RoomNoLatestMessageResDto {
    private String id;
    private Long consumerId;
    private Long storeId;
    private String imgSrc;
    private String name;
    private String latestMessage;
    private int storeNotReadCnt;
    private int consumerNotReadCnt;
    private String uuid;
}
