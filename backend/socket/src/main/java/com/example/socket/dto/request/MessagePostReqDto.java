package com.example.socket.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MessagePostReqDto {
    private String content;
    private List<String> imgSrc;
    private Long storeId;
    private Long consumerId;
    private String direction;

}
