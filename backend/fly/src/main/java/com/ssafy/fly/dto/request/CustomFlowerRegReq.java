package com.ssafy.fly.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
public class CustomFlowerRegReq {
    private Packing packing;
    private String size;
    private List<Flowers> flowers;
    private int price;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Packing {
        private String material;
        private String color;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Flowers {
        private String name;
        private int cnt;
        private List<String> color;
    }
}