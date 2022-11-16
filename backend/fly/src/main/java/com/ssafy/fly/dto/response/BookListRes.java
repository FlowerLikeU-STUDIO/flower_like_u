package com.ssafy.fly.dto.response;

import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.util.Date;


@Data
@SuperBuilder
public class BookListRes {
    private Long bookId;
    private String type;
    private String image;
    private String request;
    private String bookDate;
    private String dueDate;
    private String state;
    private Long reviewId;

    @Data
    @SuperBuilder
    public static class BookElementForConsumer extends BookListRes {
        private String storeName;
    }

    @Data
    @SuperBuilder
    public static class BookElementForStore extends BookListRes {
        private String consumerName;
    }

    // 상세 조회용
    @Data
    @SuperBuilder
    public static class BookElementForAll extends BookListRes {
        private String consumerId;
        private Long storeId;
        private String consumerName;
        private String storeName;
    }
}
