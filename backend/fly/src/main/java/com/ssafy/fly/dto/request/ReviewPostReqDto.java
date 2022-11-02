package com.ssafy.fly.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewPostReqDto {
    private Long consumerId;
    private Long storeId;
    private String content;
    private Double rating;
}
