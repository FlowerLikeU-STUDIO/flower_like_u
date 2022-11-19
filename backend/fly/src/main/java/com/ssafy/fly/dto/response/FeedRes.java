package com.ssafy.fly.dto.response;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
public class FeedRes {
    private Long feedId;
    private String name;
    private int price;
    private String content;

    @Data
    @EqualsAndHashCode(callSuper=false)
    @SuperBuilder
    public static class FeedListElement extends FeedRes {
        private String image;
    }

    @Data
    @EqualsAndHashCode(callSuper=false)
    @SuperBuilder
    public static class FeedDetailRes extends FeedRes {
        private List<String> image;
    }
}
