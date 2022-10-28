package com.ssafy.fly.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterReq {
    private String type;
    private String userId;
    private String password;
    private String password2;
    private String name;
    private String email;
    private String store;
    private String license;
    private String address;
}
