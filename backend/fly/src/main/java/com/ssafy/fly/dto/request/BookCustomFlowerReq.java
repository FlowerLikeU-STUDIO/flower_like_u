package com.ssafy.fly.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BookCustomFlowerReq {
    private String userId;
    private String flowerId;
}
