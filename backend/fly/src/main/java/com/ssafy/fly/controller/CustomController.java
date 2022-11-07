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

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

//@CrossOrigin(origins = "*")
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
    public ResponseEntity<Map<String, Object>> registFlower(@RequestBody CustomFlowerRegReq customFlowerRegReq,
                                                            Principal principal) {
        System.out.println("[POST] - /custom");
        System.out.println(customFlowerRegReq);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = customFlowerService.saveCustomFlower(customFlowerRegReq, principal);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 2. 커스텀 꽃다발 목록 조회
    @GetMapping()
    public ResponseEntity<Map<String, Object>> getCustomFlowerList(@RequestParam(value = "page", required = false, defaultValue = "0") int pageNo,
                                                                   @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                                   Principal principal) {
        System.out.println("[GET] /custom ");

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = customFlowerService.getCustomFlowerList(pageNo, size, principal);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
            response.put("designList", result.get("list"));
            response.put("maxPage", result.get("maxPage"));
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 3. 커스텀 꽃다발 상세 정보 조회
    @GetMapping("/detail/{flowerId}")
    public ResponseEntity<Map<String, Object>> getCumstomFlowerDetailInfo(@PathVariable String flowerId,
                                                                          Principal principal) {
        System.out.println("[GET] /custom/detail/{flowerId} " + flowerId);
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = customFlowerService.getCustomFlowerDetails(flowerId, principal);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
            response.put("flowerInfo", result);
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 4. 커스텀 꽃다발 정보 삭제(작업 우선 순위가 낮아 추후 구현)
    @DeleteMapping("/{flowerId}")
    public ResponseEntity<Map<String, Object>> removeCumstomFlowerInfo(@PathVariable String flowerId,
                                                                             Principal principal) {
        System.out.println("[DELETE] /custom/{flowerId} " + flowerId);
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = customFlowerService.removeCustomFlower(flowerId, principal);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
