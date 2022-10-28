package com.ssafy.fly.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FindPwdReq {
    private String userId;
    private String name;
    private String email;
}
