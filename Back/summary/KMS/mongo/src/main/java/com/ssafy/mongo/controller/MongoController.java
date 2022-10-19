package com.ssafy.mongo.controller;

import com.ssafy.mongo.database.document.FlowerDocument;
import com.ssafy.mongo.database.document.NameDocument;
import com.ssafy.mongo.database.repository.FlowerRepository;
import com.ssafy.mongo.database.repository.NameRepository;
import com.ssafy.mongo.request.FlowerReqDto;
import com.ssafy.mongo.request.NameReqDto;
import com.ssafy.mongo.response.NameResVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/test")
public class MongoController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    NameRepository nameRepository;

    @Autowired
    FlowerRepository flowerRepository;

    @PostMapping("/name")
    public ResponseEntity<Map<String, Object>> registName(@RequestBody NameReqDto params) throws Exception {
        System.out.println("[POST] - /test/name");
        System.out.println(params);

        Map<String, Object> result = new HashMap<>();

        NameDocument names = NameDocument.builder()
                .firstName(params.getFirstName())
                .lastName(params.getLastName())
                .build();

        nameRepository.insert(names);

        result.put("message", SUCCESS);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/name/{firstName}")
    public ResponseEntity<Map<String, Object>> getName(@PathVariable String firstName) throws Exception {
        System.out.println("[POST] - /test/name/{firstName}");
        System.out.println(firstName);


        Map<String, Object> result = new HashMap<>();

        NameDocument name = nameRepository.findByFirstName(firstName).get(0);

        if (name != null) {
            NameResVo nameRes = NameResVo.builder()
                    .firstName(name.getFirstName())
                    .lastName(name.getLastName())
                    .build();
            result.put("info", nameRes);
            result.put("message", SUCCESS);
        } else {
            result.put("message", FAIL);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("flower")
    public ResponseEntity<Map<String, Object>> registFlower(@RequestBody FlowerReqDto params) throws Exception {
        System.out.println("[POST] - /test/save");
        System.out.println(params);

        Map<String, Object> result = new HashMap<>();

        int flowerNum = params.getFlowers().size();

        List<FlowerDocument.Flowers> flowerList = new ArrayList<>();
        for (int i = 0; i < flowerNum; i++) {
            FlowerDocument.Flowers flower = FlowerDocument.Flowers.builder()
                    .name(params.getFlowers().get(i).getName())
                    .cnt(params.getFlowers().get(i).getCnt())
                    .color(params.getFlowers().get(i).getColor())
                    .build();
            flowerList.add(flower);
        }

        FlowerDocument customizeInfo = FlowerDocument.builder()
                .packing(FlowerDocument.Packing.builder()
                        .material(params.getPacking().getMaterial())
                        .color(params.getPacking().getColor())
                        .build())
                .size(params.getSize())
                .flowers(flowerList)
                .price(params.getPrice())
                .build();
        System.out.println(customizeInfo);

        flowerRepository.insert(customizeInfo);

        result.put("message", SUCCESS);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
