package com.ssafy.fly.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CustomDetailRes {
    private String type;
    private String wrapper;
    private String ribbon;
    private String size;
    private List<String> flowers;
}
