package com.ssafy.fly.dto.request;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class BookCustomFlowerReq {
    private String consumerId;
    private Long storeId;
    private String flowerId;
    private Date dueDate;
    private String request;
}
