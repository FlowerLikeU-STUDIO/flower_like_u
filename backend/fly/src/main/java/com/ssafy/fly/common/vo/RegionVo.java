package com.ssafy.fly.common.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RegionVo {
    private String address;
    private String name;
    private Double latitude;
    private Double longitude;
}
