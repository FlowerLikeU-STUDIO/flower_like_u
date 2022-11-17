package com.ssafy.fly.dto.request;

import lombok.Builder;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;

@Data
@Builder
public class FindIdReq {
    @Length(min= 2, max = 30)
    private String name;

    @Email
    private String email;
}
