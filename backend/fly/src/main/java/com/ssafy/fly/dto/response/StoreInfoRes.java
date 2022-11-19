package com.ssafy.fly.dto.response;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@ToString(exclude = "profile")
@SuperBuilder
public class StoreInfoRes {
    private String storeName;
    private String address;
    private String profile;
    private double rating;
    private List<Boolean> holidays;

    @Data
    @EqualsAndHashCode(callSuper=false)
    @SuperBuilder
    public static class ForDetails extends StoreInfoRes {
        private String name;
        private String email;
        private int feedNum;
        private String introduction;
    }

    @Data
    @EqualsAndHashCode(callSuper=false)
    @SuperBuilder
    public static class ForList extends StoreInfoRes {
        private Long storeId;
        private Double latitude;
        private Double longitude;
    }
}
