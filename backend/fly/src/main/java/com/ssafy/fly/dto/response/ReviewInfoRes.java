package com.ssafy.fly.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class ReviewInfoRes {
    private Long reviewId;
    private String writer;
    private String writerProfile;
    private Double rating;
    private String content;
    private String regDate;
}
