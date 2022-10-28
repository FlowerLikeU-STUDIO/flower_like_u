package com.ssafy.fly.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.util.Date;

@Data
@ToString(exclude = "profile")
@Builder
public class ConsumerInfoRes {
    private String type;
    private String userId;
    private String name;
    private String nickname;
    private String email;
    private String address;
    private String profile;
    private Date regDate;
}
