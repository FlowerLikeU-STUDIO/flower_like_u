package com.ssafy.fly.controller;

import com.ssafy.fly.common.util.ResultMessageSet;
import com.ssafy.fly.dto.request.ReviewPostReqDto;
import com.ssafy.fly.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/review")
public class ReviewController {

    private final ReviewService reviewService;
    private final ResultMessageSet resultMessageSet;

    @Autowired
    public ReviewController(ReviewService reviewService,
                            ResultMessageSet resultMessageSet) {
        this.reviewService = reviewService;
        this.resultMessageSet = resultMessageSet;
    }

    // 1. 리뷰 등록
    @PostMapping()
    public ResponseEntity<Map<String,Object>> create(@RequestBody ReviewPostReqDto reviewPostReqDto,
                                                     Principal principal) {
        System.out.println("[POST] - /review " + reviewPostReqDto);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = reviewService.create(reviewPostReqDto, principal);

        if((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    // 2. 리뷰 목록 조회
    @GetMapping(value = {"", "/{storeId}"})
    public ResponseEntity<Map<String,Object>> getList(@PathVariable(required = false) Long storeId,
                                                      @RequestParam(value = "page", required = false, defaultValue = "0") int pageNo,
                                                      @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                      Principal principal) {
        System.out.println("[GET] - /review " + storeId);

        Pageable pageable = PageRequest.of((pageNo > 0 ? pageNo - 1 : 0), size, Sort.by("id").descending());

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = reviewService.getList(storeId, pageable, principal);

        if((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
            response.put("reviewList", result.get("reviewList"));
            response.put("maxPage", result.get("maxPage"));
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
