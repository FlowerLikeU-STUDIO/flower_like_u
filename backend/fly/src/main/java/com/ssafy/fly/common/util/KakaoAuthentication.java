package com.ssafy.fly.common.util;

import com.ssafy.fly.common.vo.KakaoUserInfo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.Map;

@Component
public class KakaoAuthentication {

    @Value("${kakao-dev.rest-key}")
    private String kakaoRestAppKey;

    /** 1. 카카오 로그인 동의 시 받은 인가 코드로 accessToken 받기 */
    public String getAccessToken(String authCode) {
        String accessToken = null;
        URI reqUrl = URI.create("https://kauth.kakao.com/oauth/token");
        String redirectUrl = "http://localhost:8080/api/auth/kakao";

        /** Request Header */
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        /** Request Body */
        MultiValueMap<String, Object> params = new LinkedMultiValueMap<>();
        params.set("grant_type", "authorization_code");
        params.set("client_id", kakaoRestAppKey);
        params.set("redirect_uri", redirectUrl);
        params.set("code", authCode);

        HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(params, headers);

        /** Access Token 요청 */
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.postForEntity(reqUrl, request, Map.class);

        if (response.getStatusCodeValue() == HttpStatus.OK.value()) {
            accessToken = (String) response.getBody().get("access_token");
        }

        return accessToken;
    }

    /** 2. accessToken으로 사용자 정보 받기 */
    public KakaoUserInfo getUserInfo(String accessToken) {
        URI reqURL = URI.create("https://kapi.kakao.com/v2/user/me");

        /** Request Header */
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(null, headers);

        /** Kakao 사용자 정보 요청 */
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.postForEntity(reqURL, request, Map.class);

        if (response.getStatusCodeValue() == HttpStatus.OK.value()) {
            Map<String, Object> resBody = response.getBody();
            Map<String, Object> kakaoAccount = (Map<String, Object>) resBody.get("kakao_account");
            Map<String, String> profile = (Map<String, String>) kakaoAccount.get("profile");

            return KakaoUserInfo.builder()
                    .email((String) kakaoAccount.get("email"))
                    .nickname(profile.get("nickname"))
                    .imageUrl(profile.get("profile_image_url"))
                    .build();
        } else {
            return null;
        }
    }
}
