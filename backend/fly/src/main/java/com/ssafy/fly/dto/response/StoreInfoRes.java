package com.ssafy.fly.dto.response;

import lombok.Data;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import net.bytebuddy.implementation.bind.annotation.Super;

import java.util.Date;

@Data
@ToString(exclude = "profile")
@SuperBuilder
public class StoreInfoRes {
    private String storeName;
    private String address;
    private String profile;
    private double rating;

    @Data
    @SuperBuilder
    public static class ForDetails extends StoreInfoRes {
        private String name;
        private String email;
        private int feedNum;
        private String introduction;
    }

    @Data
    @SuperBuilder
    public static class ForList extends StoreInfoRes {
        private Long storeId;
        private Double latitude;
        private Double longitude;
    }
}
