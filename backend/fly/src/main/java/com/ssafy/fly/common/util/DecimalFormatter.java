package com.ssafy.fly.common.util;

import org.springframework.stereotype.Component;

@Component
public class DecimalFormatter {
    public double roundToTwoDecimalPlaces(double number) {
        return (double) Math.round(number * 100) / 100;
    }
}
