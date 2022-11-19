package com.ssafy.fly.common.message;

import org.springframework.stereotype.Component;

@Component
public class ResultMessageSet {
    public static final String SUCCESS = "success";
    public static final String FAIL = "fail";
    public static final String DUPLICATED = "duplicated";
    public static final String NONDUPLICATED = "nonDuplicated";
}
