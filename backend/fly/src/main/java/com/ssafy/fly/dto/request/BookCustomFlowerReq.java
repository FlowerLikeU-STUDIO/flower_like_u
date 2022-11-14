package com.ssafy.fly.dto.request;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class BookCustomFlowerReq {
    private Long storeId;
    private String flowerId;
    private String request;
    private Date dueDate;
}
