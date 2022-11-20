package com.ssafy.fly.common.util;

import org.springframework.stereotype.Component;

@Component
public class DecimalFormatter {
    /** 입력받은 숫자를 반올림하여 소수점 둘째 자리까지 표현 */
    public double roundToTwoDecimalPlaces(double number) {
        return (double) Math.round(number * 100) / 100;
    }
}
