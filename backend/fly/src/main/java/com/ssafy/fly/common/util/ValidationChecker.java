package com.ssafy.fly.common.util;

import org.springframework.stereotype.Component;

@Component
public class ValidationChecker {
    // 비밀번호 특수문자 검사

    public boolean idValidationCheck(String inputId) {
        return inputId.length() <= 16 && validationCheck(inputId, 8);
    }

    public boolean pwdValidationCheck(String inputPwd) {
        return validationCheck(inputPwd, 12);
    }

    public boolean storeLicenseValidationCheck(String inputLicense) {
        return inputLicense.replace("-", "").length() == 10;
    }

    private boolean validationCheck(String str, int length) {
        if (str.length() < length) {
            return false;
        } else {
            boolean containNumeric = str.matches(".*[0-9].*");
            boolean containAlphabet = str.matches(".*[a-zA-Z].*");
            return containNumeric && containAlphabet;
        }
    }
}
