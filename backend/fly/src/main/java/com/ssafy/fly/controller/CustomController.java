package com.ssafy.fly.controller;

import com.ssafy.fly.common.util.ResultMessageSet;
import com.ssafy.fly.database.mongodb.repository.CustomFlowerMongoRepository;
import com.ssafy.fly.dto.request.CustomFlowerRegReq;
import com.ssafy.fly.service.CustomFlowerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/custom")
public class CustomController {

    private final CustomFlowerService customFlowerService;
    private final ResultMessageSet resultMessageSet;

    @Autowired
    public CustomController(CustomFlowerService customFlowerService,
                            ResultMessageSet resultMessageSet) {
        this.customFlowerService = customFlowerService;
        this.resultMessageSet = resultMessageSet;
    }

    // 1. 커스텀 꽃다발 정보 등록
    @PostMapping()
    public ResponseEntity<Map<String, Object>> registFlower(@RequestBody CustomFlowerRegReq customFlowerRegReq) {
        System.out.println("[POST] - /custom");
        System.out.println(customFlowerRegReq);

        Map<String, Object> response = new HashMap<>();

        if (customFlowerService.saveCustomFlower(customFlowerRegReq)) {
            response.put("result", resultMessageSet.SUCCESS);
        } else {
            response.put("result", resultMessageSet.FAIL);
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 2. 커스텀 꽃다발 목록 조회
    @GetMapping("/designs/{userId}")
    public ResponseEntity<Map<String, Object>> getCustomFlowerList(@PageableDefault(size = 10) Pageable pageable,
                                                                   @RequestParam(required = false, defaultValue = "0", value = "page") int pageNo,
                                                                   @PathVariable String userId) {
        System.out.println("[GET] /custom/designs/{userId} " + userId);

        pageNo = (pageNo == 0) ? 0 : (pageNo - 1);
        System.out.println(pageNo);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> data = customFlowerService.getCustomFlowerList(userId, pageable, pageNo);

        if (data != null) {
            response.put("result", resultMessageSet.SUCCESS);
            response.put("designList", data.get("list"));
            response.put("maxPage", data.get("maxPage"));
        } else {
            response.put("result", resultMessageSet.FAIL);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 3. 커스텀 꽃다발 상세 정보 조회
    @GetMapping("/detail/{flowerId}")
    public ResponseEntity<Map<String, Object>> getCumstomFlowerDetailInfo(@PathVariable String flowerId) {
        System.out.println("[GET] /custom/detail/{flowerId} " + flowerId);
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> data = customFlowerService.getCustomFlowerDetails(flowerId);

        if (data != null) {
            response.put("result", resultMessageSet.SUCCESS);
            response.put("flowerInfo", data);
        } else {
            response.put("result", resultMessageSet.FAIL);
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 4. 커스텀 꽃다발 정보 삭제(작업 우선 순위가 낮아 추후 구현)
}
