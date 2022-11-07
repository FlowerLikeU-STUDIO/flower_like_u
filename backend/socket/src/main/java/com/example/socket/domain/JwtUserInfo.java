package com.example.socket.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtUserInfo {
    private String sub;
    private String role;
}
