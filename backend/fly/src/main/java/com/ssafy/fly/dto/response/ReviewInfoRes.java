package com.ssafy.fly.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewInfoRes {
    private Long reviewId;
    private String writer;
    private Double rating;
    private String content;
}
