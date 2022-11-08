package com.ssafy.fly.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.util.Date;

@Data
@ToString(exclude = "profile")
@Builder
public class StoreInfoRes {
    //private String type;
    //private String userId;
    private String name;
    private String email;
    private String storeName;
    //private String license;
    private String address;
    private String profile;
    private int feedNum;
    private String introduction;
    private double rating;
    //private Date regDate;
}
