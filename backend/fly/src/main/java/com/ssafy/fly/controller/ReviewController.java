package com.ssafy.fly.controller;

import com.ssafy.fly.database.mysql.entity.ReviewEntity;
import com.ssafy.fly.dto.request.ReviewPostReqDto;
import com.ssafy.fly.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/{storeId}")
    public ResponseEntity<Map<String,Object>> getList(@RequestParam(value = "page") int page, @RequestParam("size") int size, @PathVariable("storeId") Long id) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("id").descending());
        Map<String,Object> map = new HashMap<>();
        map.put("message","success");
        map.put("response",reviewService.getList(id, pageable));
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Map<String,Object>> create(@RequestBody ReviewPostReqDto reviewPostReqDto) {
        reviewService.create(reviewPostReqDto);
        Map<String,Object> map = new HashMap<>();
        map.put("message","success");
        return new ResponseEntity<>(map, HttpStatus.CREATED);
    }
}
