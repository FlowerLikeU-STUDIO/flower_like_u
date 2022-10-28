package com.ssafy.fly.common.util;

import org.springframework.stereotype.Component;

@Component
public class ValidationChecker {

    public boolean idValidationCheck(String inputId) {
        return inputId.matches("^[a-zA-Z0-9]{8,16}$");
        //return inputId.length() <= 16 && validationCheck(inputId, 8);
    }

    public boolean pwdValidationCheck(String inputPwd) {
        return inputPwd.matches("^.*(?=^.{8,16}$)(?=.*\\d)(?=.*[a-zA-Z])(?=.*[\\!\\@\\#\\$\\%\\^\\&\\*]).*$");
        //return validationCheck(inputPwd, 12);
    }

    public boolean storeLicenseValidationCheck(String inputLicense) {
        return inputLicense.replace("-", "").length() == 10;
    }

//    private boolean validationCheck(String str, int length) {
//        if (str.length() < length) {
//            return false;
//        } else {
//            boolean containNumeric = str.matches(".*[0-9].*");
//            boolean containAlphabet = str.matches(".*[a-zA-Z].*");
//            return containNumeric && containAlphabet;
//        }
//    }
}
