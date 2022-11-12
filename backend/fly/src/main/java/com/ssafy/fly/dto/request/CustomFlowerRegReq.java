package com.ssafy.fly.dto.request;

import lombok.*;

import java.util.List;

@Data
@Builder
public class CustomFlowerRegReq {
    private String image;
    private String type;
    private Long wrapperId;
    private Long ribbonId;
    private String size;
    private List<Long> flowers;
}