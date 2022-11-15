package com.ssafy.fly.common.util;

import org.springframework.stereotype.Component;

@Component
public class ValidationChecker {

    public boolean idValidationCheck(String inputId) {
        return inputId.matches("^.*(?=^.{8,16}$)(?=.*\\d)(?=.*[a-zA-Z]).*$");
    }

    public boolean pwdValidationCheck(String inputPwd) {
        return inputPwd.matches("^.*(?=^.{8,16}$)(?=.*\\d)(?=.*[a-zA-Z])(?=.*[\\!\\@\\#\\$\\%\\^\\&\\*]).*$");
    }

    public boolean storeLicenseValidationCheck(String inputLicense) {
        return inputLicense.replace("-", "").length() == 10;
    }
}
