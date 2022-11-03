package com.ssafy.fly.controller;

import com.ssafy.fly.common.util.ResultMessageSet;
import com.ssafy.fly.dto.request.RegisterFeedReq;
import com.ssafy.fly.service.FeedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/feed")
public class FeedController {
    private final FeedService feedService;
    private final ResultMessageSet resultMessageSet;

    @Autowired
    public FeedController(FeedService feedService,
                          ResultMessageSet resultMessageSet) {
        this.feedService = feedService;
        this.resultMessageSet = resultMessageSet;
    }

    @PostMapping()
    public ResponseEntity<Map<String, Object>> registNewFeed(@RequestBody RegisterFeedReq registerFeedReq) {
        System.out.println("[POST] /feed " + registerFeedReq);

        Map<String, Object> response = new HashMap<>();
//        Map<String, Object> result = feedService.saveNewFeed(registerFeedReq);
//
//        if((boolean) result.get("result")) {
//            response.put("result", resultMessageSet.SUCCESS);
//        } else {
//            response.put("result", resultMessageSet.FAIL);
//            response.put("message", result.get("message"));
//        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

}
