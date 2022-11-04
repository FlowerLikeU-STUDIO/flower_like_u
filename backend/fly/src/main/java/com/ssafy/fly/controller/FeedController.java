package com.ssafy.fly.controller;

import com.ssafy.fly.common.util.ResultMessageSet;
import com.ssafy.fly.dto.request.RegisterFeedReq;
import com.ssafy.fly.service.FeedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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

    // 1. 피드 등록
    @PostMapping()
    public ResponseEntity<Map<String, Object>> createNewFeed(@RequestBody @Valid RegisterFeedReq registerFeedReq) {
        System.out.println("[POST] /feed " + registerFeedReq);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = feedService.saveNewFeed(registerFeedReq);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 2. 피드 목록 조회
    // /user/{userId}는 ""으로 변경 예정(JWT 이후)
    // /user은 /{storeId}의 path와 구분하기 위해 임시로 둔 경로
    @GetMapping(value = {"/user/{userId}", "/{storeId}"})
    public ResponseEntity<Map<String, Object>> getFeedList(@PathVariable(required = false) String userId,
                                                           @PathVariable(required = false) Long storeId,
                                                           @RequestParam(value = "page", required = false, defaultValue = "0") int pageNo,
                                                           @RequestParam(value = "size", required = false, defaultValue = "9") int size) {
        System.out.println("[GET] /feed " + userId + " " + storeId);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = feedService.getFeedList(userId, storeId, pageNo, size);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
            response.put("feedInfo", result.get("info"));
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 3. 피드 상세 조회
    @GetMapping("/detail/{feedId}")
    public ResponseEntity<Map<String, Object>> getFeedDetailInfo(@PathVariable Long feedId) {
        System.out.println("[GET] /feed/{feedId} " + feedId);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = feedService.getFeedDetailInfo(feedId);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
            response.put("feedInfo", result.get("feedInfo"));
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 4. 피드 수정
//    @PutMapping()
//    public ResponseEntity<Map<String, Object>> updateFeedInfo() {
//        System.out.println("[PUT] /feed ");
//
//        Map<String, Object> response = new HashMap<>();
//        Map<String, Object> result = feedService.updateFeedInfo();
//
//        if ((boolean) result.get("result")) {
//            response.put("result", resultMessageSet.SUCCESS);
//            response.put("feedList", result.get("feedList"));
//        } else {
//            response.put("result", resultMessageSet.FAIL);
//            response.put("message", result.get("message"));
//        }
//
//        return new ResponseEntity<>(response, HttpStatus.CREATED);
//    }

    // 5. 피드 삭제
    @DeleteMapping("/{feedId}")
    public ResponseEntity<Map<String, Object>> deleteFeedInfo(@PathVariable Long feedId) {
        System.out.println("[DELETE] /feed " + feedId);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = feedService.deleteFeedInfo(feedId);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
