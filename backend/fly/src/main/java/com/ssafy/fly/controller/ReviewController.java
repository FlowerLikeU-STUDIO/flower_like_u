package com.ssafy.fly.controller;

import com.ssafy.fly.common.message.ResponseKeySet;
import com.ssafy.fly.common.message.ResultMessageSet;
import com.ssafy.fly.dto.request.ReviewPostReqDto;
import com.ssafy.fly.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/review")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    /** 1. 리뷰 등록 */
    @PostMapping()
    public ResponseEntity<Map<String, Object>> create(@RequestBody ReviewPostReqDto reviewPostReqDto,
                                                      Authentication authentication) {
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = reviewService.create(reviewPostReqDto, authentication);

        if ((boolean) result.get("result")) {
            response.put(ResponseKeySet.RESULT, ResultMessageSet.SUCCESS);
        } else {
            response.put(ResponseKeySet.RESULT, ResultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /** 2. 리뷰 목록 조회 */
    @GetMapping(value = "/{storeId}")
    public ResponseEntity<Map<String, Object>> getList(@PathVariable(required = false) Long storeId,
                                                       @RequestParam(value = "page", required = false, defaultValue = "0") int pageNo,
                                                       @RequestParam(value = "size", required = false, defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of((pageNo > 0 ? pageNo - 1 : 0), size, Sort.by("id").descending());

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = reviewService.getList(storeId, pageable);

        if ((boolean) result.get("result")) {
            response.put(ResponseKeySet.RESULT, ResultMessageSet.SUCCESS);
            response.put("content", result.get("content"));
            response.put("pageable", result.get("pageable"));
            response.put("sort", result.get("sort"));
            response.put("first", result.get("first"));
            response.put("last", result.get("last"));
            response.put("empty", result.get("empty"));
            response.put("totalPages", result.get("totalPages"));
            response.put("pageSize", result.get("pageSize"));
            response.put("totalElements", result.get("totalElements"));
            response.put("curPage", result.get("curPage"));
            response.put("number", result.get("number"));
        } else {
            response.put(ResponseKeySet.RESULT, ResultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /** 3. 리뷰 내용 조회 */
    @GetMapping("/detail/{reviewId}")
    public ResponseEntity<Map<String, Object>> getReviewInfo(@PathVariable Long reviewId,
                                                             Authentication authentication) {
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = reviewService.getReviewInfo(reviewId, authentication);

        if ((boolean) result.get("result")) {
            response.put(ResponseKeySet.RESULT, ResultMessageSet.SUCCESS);
            response.put("reviewInfo", result.get("reviewInfo"));
        } else {
            response.put(ResponseKeySet.RESULT, ResultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
