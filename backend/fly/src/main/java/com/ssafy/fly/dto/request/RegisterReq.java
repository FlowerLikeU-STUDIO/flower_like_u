package com.ssafy.fly.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;

@Data
@Builder
public class RegisterReq {
    @Pattern(regexp = "(consumer|store)", message = "type은 consumer 또는 store만 가능합니다")
    private String type;

    @Pattern(regexp = "^.*(?=^.{8,16}$)(?=.*\\d)(?=.*[a-zA-Z]).*$",
            message = "올바른 아이디 형식이 아닙니다. 알파벳 + 숫자 조합 8~16자를 입력해주세요")
    private String userId;

    @Pattern(regexp = "^.*(?=^.{8,16}$)(?=.*\\d)(?=.*[a-zA-Z])(?=.*[\\!\\@\\#\\$\\%\\^\\&\\*]).*$",
            message = "올바른 비밀번호 형식이 아닙니다. 알파벳 + 숫자 + 특수문자 조합 8~16자를 입력해주세요")
    private String password;

    @Pattern(regexp = "^.*(?=^.{8,16}$)(?=.*\\d)(?=.*[a-zA-Z])(?=.*[\\!\\@\\#\\$\\%\\^\\&\\*]).*$",
            message = "올바른 비밀번호 형식이 아닙니다. 알파벳 + 숫자 + 특수문자 조합 8~16자를 입력해주세요")
    private String password2;

    @Length(min= 2, max = 30)
    private String name;

    @Email
    private String email;

    private String store;

    @Pattern(regexp = "([0-9]{3})-?([0-9]{2})-?([0-9]{5})",
            message = "올바른 사업자 등록번호 형식이 아닙니다. 000-00-00000 형태로 입력해주세요")
    private String license;

    private Address address;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Address {
        private String zipCode;
        private String street;
        private String details;
        private String sigunguCode;
        private Double latitude;
        private Double longitude;
    }
}
