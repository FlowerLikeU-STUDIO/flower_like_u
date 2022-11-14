package com.ssafy.fly.common.util;

import com.fasterxml.jackson.databind.util.JSONPObject;
import org.apache.tomcat.util.digester.DocumentProperties;
import org.bson.json.JsonObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@Component
public class KakaoAuthentication {

    @Value("${kakao-dev.rest-key}")
    private String kakaoRestAppKey;

    @Value("${kakao-dev.admin-key}")
    private String adminKey;

    /** 1. 카카오 로그인 동의 시 받은 인가 코드로 accessToken 받기 */
    public Map<String, Object> getAccessToken(String authCode) {
        URI reqUrl = URI.create("https://kauth.kakao.com/oauth/token");
        String redirectUrl = "http://localhost:8080/api/auth/kakao";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, Object> params = new LinkedMultiValueMap<>();
        params.set("grant_type", "authorization_code");
        params.set("client_id", kakaoRestAppKey);
        params.set("redirect_uri", redirectUrl);
        params.set("code", authCode);

        HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(params, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.postForEntity(reqUrl, request, Map.class);

        Map<String, Object> result = new HashMap<>();
        String message = "";

        if(response.getStatusCodeValue() == HttpStatus.OK.value()) {
            result.put("result", true);
            result.put("accessToken", response.getBody().get("access_token"));
        } else {
            message = "카카오 로그인 인증에 실패하였습니다.";
            result.put("result", false);
            result.put("message", message);
        }

        return result;
    }

    /** 2. accessToken으로 사용자 정보 받기 */
    public Map<String, Object> getUserInfo(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        headers.set("Authorization", "Bearer " + accessToken + "/KakaoAK " + adminKey);


        Map<String, Object> result = new HashMap<>();
        return result;
    }
}
