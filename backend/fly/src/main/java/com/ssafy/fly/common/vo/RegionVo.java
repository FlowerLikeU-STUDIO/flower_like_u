package com.ssafy.fly.common.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class RegionVo {
    private String address;
    private String name;
    private Double latitude;
    private Double longitude;
    private String store;
    private String bio;
    private String profile;
    private Double rating;
    private List<Boolean> holidays;
}
