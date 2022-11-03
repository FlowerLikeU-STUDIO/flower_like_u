package com.ssafy.fly.dto.request;

import lombok.Builder;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
@Builder
public class RegisterFeedReq {
    @Length(min = 8, max = 16)
    private String storeId;

    @Length(max = 20)
    private String name;

    private int price;

    @Length(max = 300)
    private String content;

    private String image;
}
