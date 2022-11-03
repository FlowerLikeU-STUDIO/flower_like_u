package com.ssafy.fly.common.util;

import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class DateConvertor {
    public String DateToSimpleDate(Date date) {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-mm-dd");
        return df.format(date);
    }
}
