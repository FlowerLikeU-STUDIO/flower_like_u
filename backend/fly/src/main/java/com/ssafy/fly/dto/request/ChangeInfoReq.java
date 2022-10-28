package com.ssafy.fly.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChangeInfoReq {
    private String type;
    private String userId;
    private String password;
    private String nickname;
    private String store;
    private String address;
    // store - holidays 정보 추가
}
