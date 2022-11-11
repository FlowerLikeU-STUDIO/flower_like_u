package com.ssafy.fly.dto.request;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class BookFeedFlowerReq {
    private Long storeId;
    private Long feedId;
    private String request;
    private Date dueDate;
}
