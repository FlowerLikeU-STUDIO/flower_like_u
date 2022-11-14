package com.ssafy.fly.common.vo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class KakaoUserInfo {
    private String email;
    private String nickname;
    private String imageUrl;
}
