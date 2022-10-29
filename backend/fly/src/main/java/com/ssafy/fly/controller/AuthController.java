package com.ssafy.fly.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @GetMapping("/test/{text}")
    public ResponseEntity<Map<String, Object>> test(@PathVariable String text) {
        System.out.println("[GET] - /auth/test" + text);

        Map<String, Object> result = new HashMap<>();
        result.put("param", text);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
