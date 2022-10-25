package com.ssafy.mongo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/member")
public class MemberController {

    @GetMapping()
    public void kakaoLogin(@RequestParam String code) throws Exception {
        System.out.println("[GET] /member");

        System.out.println(code);
    }
}
