package com.ssafy.fly.controller;

import com.ssafy.fly.common.util.RandomNicknameMaker;
import com.ssafy.fly.common.util.RandomStringGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping()
    public ResponseEntity<Map<String, Object>> test() {
        Map<String, Object> response = new HashMap<>();
        response.put("result", "SUCCESS");
        response.put("message", RandomNicknameMaker.getNickname());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
