package com.ssafy.fly.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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