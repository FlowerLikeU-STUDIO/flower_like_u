package com.ssafy.fly.dto.request;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.validation.constraints.Pattern;

@Data
@Builder
public class ChangePwdReq {
    @Pattern(regexp = "^.*(?=^.{8,16}$)(?=.*\\d)(?=.*[a-zA-Z])(?=.*[\\!\\@\\#\\$\\%\\^\\&\\*]).*$",
            message = "올바른 비밀번호 형식이 아닙니다. 알파벳 + 숫자 + 특수문자 조합 8~16자를 입력해주세요")
    private String curPwd;

    @Pattern(regexp = "^.*(?=^.{8,16}$)(?=.*\\d)(?=.*[a-zA-Z])(?=.*[\\!\\@\\#\\$\\%\\^\\&\\*]).*$",
            message = "올바른 비밀번호 형식이 아닙니다. 알파벳 + 숫자 + 특수문자 조합 8~16자를 입력해주세요")
    private String newPwd;

    @Pattern(regexp = "^.*(?=^.{8,16}$)(?=.*\\d)(?=.*[a-zA-Z])(?=.*[\\!\\@\\#\\$\\%\\^\\&\\*]).*$",
            message = "올바른 비밀번호 형식이 아닙니다. 알파벳 + 숫자 + 특수문자 조합 8~16자를 입력해주세요")
    private String newPwd2;
}
