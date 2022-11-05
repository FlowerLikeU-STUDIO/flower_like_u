package com.ssafy.fly.dto.request;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class BookFeedFlowerReq {
    private String consumerId;
    private Long storeId;
    private Long feedId;
    private Date dueDate;
    private String request;
}
