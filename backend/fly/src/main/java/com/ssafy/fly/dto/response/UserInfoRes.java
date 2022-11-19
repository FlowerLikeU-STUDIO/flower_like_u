package com.ssafy.fly.dto.response;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@ToString(exclude = "profile")
@SuperBuilder
public class UserInfoRes {
    private String type;
    private Long userPk;
    private String userId;
    private String name;
    private String email;
    private Address address;
    private String profile;

    @Data
    @SuperBuilder
    public static class Address {
        private String zipCode;
        private String street;
        private String details;
        private String sigunguCode;
    }

    @Data
    @EqualsAndHashCode(callSuper=false)
    @SuperBuilder
    public static class ForConsumer extends UserInfoRes {
        private String nickname;
    }

    @Data
    @EqualsAndHashCode(callSuper=false)
    @SuperBuilder
    public static class ForStore extends UserInfoRes {
        private String storeName;
        private String license;
        private int feedNum;
        private String introduction;
        private double rating;
        private List<Boolean> holidays;
    }
}
