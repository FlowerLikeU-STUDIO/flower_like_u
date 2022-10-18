package com.ssafy.mongo.controller;

import com.ssafy.mongo.database.document.TestDocument;
import com.ssafy.mongo.database.repository.TestRepository;
import com.ssafy.mongo.request.FlowerReqDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/test")
public class MongoController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    TestRepository testRepository;

    @PostMapping("save")
    public ResponseEntity<Map<String, Object>> registerMember(@RequestBody FlowerReqDto params) throws Exception {
        System.out.println("[POST] - /test/save");
        System.out.println(params);

        Map<String, Object> result = new HashMap<>();

        TestDocument t = TestDocument.builder()
                .firstName("minseong")
                .lastName("kang")
                .build();

        testRepository.insert(t);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }


}
