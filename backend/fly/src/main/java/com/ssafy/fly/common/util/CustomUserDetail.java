package com.ssafy.fly.common.util;

import org.springframework.security.core.userdetails.UserDetails;

public interface CustomUserDetail extends UserDetails {
    public Long getUserPk();

    public String getUserType();
}
