package com.ssafy.fly.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
public class ChangeInfoReq {
    private String type;
    private String userId;
    private String nickname;
    private String store;
    private Address address;
    private List<Boolean> holidays;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Address {
        private String zipCode;
        private String street;
        private String details;
        private String sigunguCode;
    }
}
