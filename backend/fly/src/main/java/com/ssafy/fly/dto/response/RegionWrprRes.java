package com.ssafy.fly.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class RegionWrprRes<T> {
    private Double avgLatitude;
    private Double avgLongitude;
    private List<T> responseList;
}
