package com.example.socket.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomCntPutReqDto {
    private Long opponent;
    private Long storeId;
    private Long consumerId;
    private String userType;
}
