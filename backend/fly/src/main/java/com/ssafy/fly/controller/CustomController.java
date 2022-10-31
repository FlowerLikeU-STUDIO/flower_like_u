package com.ssafy.fly.controller;

import com.ssafy.fly.database.mongodb.document.CustomFlowerDocument;
import com.ssafy.fly.database.mongodb.repository.CustomFlowerRepository;
import com.ssafy.fly.dto.request.CustomFlowerRegReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/custom")
public class CustomController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final CustomFlowerRepository customFlowerRepository;

    @Autowired
    public CustomController(CustomFlowerRepository customFlowerRepository) {
        this.customFlowerRepository = customFlowerRepository;
    }

    @PostMapping("flower")
    public ResponseEntity<Map<String, Object>> registFlower(@RequestBody CustomFlowerRegReq params) {
        System.out.println("[POST] - /custom/flower");
        System.out.println(params);

        Map<String, Object> result = new HashMap<>();

        int flowerNum = params.getFlowers().size();

        List<CustomFlowerDocument.Flowers> flowerList = new ArrayList<>();
        for (int i = 0; i < flowerNum; i++) {
            CustomFlowerDocument.Flowers flower = CustomFlowerDocument.Flowers.builder()
                    .name(params.getFlowers().get(i).getName())
                    .cnt(params.getFlowers().get(i).getCnt())
                    .color(params.getFlowers().get(i).getColor())
                    .build();
            flowerList.add(flower);
        }

        CustomFlowerDocument customizeInfo = CustomFlowerDocument.builder()
                .packing(CustomFlowerDocument.Packing.builder()
                        .material(params.getPacking().getMaterial())
                        .color(params.getPacking().getColor())
                        .build())
                .size(params.getSize())
                .flowers(flowerList)
                .price(params.getPrice())
                .build();
        System.out.println(customizeInfo);

        customFlowerRepository.insert(customizeInfo);

        result.put("message", SUCCESS);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
