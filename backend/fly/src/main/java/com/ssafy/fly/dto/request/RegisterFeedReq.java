package com.ssafy.fly.dto.request;

import lombok.Builder;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Pattern;
import java.util.List;

@Data
@Builder
public class RegisterFeedReq {
    @Length(max = 20)
    private String name;

    private int price;

    @Length(max = 300)
    private String content;

    private List<String> image;
}
