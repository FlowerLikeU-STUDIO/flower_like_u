package com.ssafy.fly.common.util;

import com.ssafy.fly.common.vo.JwtUserInfo;

import java.util.Base64;

public class JwtConverter {
    public static JwtUserInfo getUserPk(String jwt) {
        String[] chunks = jwt.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();

        String[] payload = new String(decoder.decode(chunks[1])).split(":");
        JwtUserInfo jwtUserInfo = new JwtUserInfo();
        String sub = payload[1].split(",")[0];
        jwtUserInfo.setSub(sub.substring(1, sub.length() - 1));
        String role = payload[2].split("]")[0];
        jwtUserInfo.setRole(role.substring(2, role.length() - 1));
        return jwtUserInfo;
    }
}
