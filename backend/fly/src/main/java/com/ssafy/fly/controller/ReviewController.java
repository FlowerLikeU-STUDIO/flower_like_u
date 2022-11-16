package com.ssafy.fly.controller;

import com.ssafy.fly.common.util.ResultMessageSet;
import com.ssafy.fly.dto.request.ReviewPostReqDto;
import com.ssafy.fly.service.ReviewService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
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

    private final Logger logger = LogManager.getLogger(ReviewController.class);

    private final ReviewService reviewService;
    private final ResultMessageSet resultMessageSet;

    @Autowired
    public ReviewController(ReviewService reviewService,
                            ResultMessageSet resultMessageSet) {
        this.reviewService = reviewService;
        this.resultMessageSet = resultMessageSet;
    }

    /** 1. 리뷰 등록 */
    @PostMapping()
    public ResponseEntity<Map<String, Object>> create(@RequestBody ReviewPostReqDto reviewPostReqDto,
                                                      Principal principal) {
        logger.info("[POST] - /review - {}", reviewPostReqDto);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = reviewService.create(reviewPostReqDto, principal);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /** 2. 리뷰 목록 조회 */
    @GetMapping(value = "/{storeId}")
    public ResponseEntity<Map<String, Object>> getList(@PathVariable(required = false) Long storeId,
                                                       @RequestParam(value = "page", required = false, defaultValue = "0") int pageNo,
                                                       @RequestParam(value = "size", required = false, defaultValue = "10") int size) {
        logger.info("[GET] - /review/{storeId} - {}", storeId);

        Pageable pageable = PageRequest.of((pageNo > 0 ? pageNo - 1 : 0), size, Sort.by("id").descending());

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = reviewService.getList(storeId, pageable);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
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
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /** 3. 리뷰 내용 조회 */
    @GetMapping("/detail/{reviewId}")
    public ResponseEntity<Map<String, Object>> getReviewInfo(@PathVariable Long reviewId,
                                                             Principal principal) {
        logger.info("[GET] - /review/detail/{reviewId} - {}", reviewId);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = reviewService.getReviewInfo(reviewId, principal);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
            response.put("reviewInfo", result.get("reviewInfo"));
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
