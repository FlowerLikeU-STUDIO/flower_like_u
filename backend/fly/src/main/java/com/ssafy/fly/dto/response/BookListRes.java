package com.ssafy.fly.dto.response;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

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
    @EqualsAndHashCode(callSuper=false)
    @SuperBuilder
    public static class BookElementForConsumer extends BookListRes {
        private String storeName;
    }

    @Data
    @EqualsAndHashCode(callSuper=false)
    @SuperBuilder
    public static class BookElementForStore extends BookListRes {
        private String consumerName;
    }

    // 상세 조회용
    @Data
    @EqualsAndHashCode(callSuper=false)
    @SuperBuilder
    public static class BookElementForAll extends BookListRes {
        private String consumerId;
        private Long storeId;
        private String consumerName;
        private String storeName;
    }
}
