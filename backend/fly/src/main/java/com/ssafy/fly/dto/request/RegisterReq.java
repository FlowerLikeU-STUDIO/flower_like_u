package com.ssafy.fly.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class RegisterReq {
    private String type;
    private String userId;
    private String password;
    private String password2;
    private String name;
    private String email;
    private String store;
    private String license;
    private Address address;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Address {
        private String zipCode;
        private String street;
        private String details;
        private String sigunguCode;
        private Double latitude;
        private Double longitude;
    }
}
