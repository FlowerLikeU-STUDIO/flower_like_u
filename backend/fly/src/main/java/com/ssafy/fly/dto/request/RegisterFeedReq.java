package com.ssafy.fly.dto.request;

import lombok.Builder;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Pattern;
import java.util.List;

@Data
@Builder
public class RegisterFeedReq {
    @Length(min = 8, max = 16)
    @Pattern(regexp = "^.*(?=^.{8,16}$)(?=.*\\d)(?=.*[a-zA-Z]).*$",
            message = "아이디는 알파벳 대소문자 + 숫자 조합이어야 합니다")
    private String storeId;

    @Length(max = 20)
    private String name;

    private int price;

    @Length(max = 300)
    private String content;

    private List<String> image;
}
