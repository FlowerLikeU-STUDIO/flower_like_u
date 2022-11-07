package com.ssafy.fly.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChangePwdReq {
    private String curPwd;
    private String newPwd;
    private String newPwd2;
}
