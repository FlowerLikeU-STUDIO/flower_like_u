package com.ssafy.fly.controller;

import com.ssafy.fly.common.util.ResultMessageSet;
import com.ssafy.fly.dto.request.RegisterFeedReq;
import com.ssafy.fly.service.FeedService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

//@CrossOrigin(origins = "*", allowedHeaders = "Authorization")
@RestController
@RequestMapping("/feed")
public class FeedController {

    private final Logger logger = LogManager.getLogger(FeedController.class);

    private final FeedService feedService;
    private final ResultMessageSet resultMessageSet;

    @Autowired
    public FeedController(FeedService feedService,
                          ResultMessageSet resultMessageSet) {
        this.feedService = feedService;
        this.resultMessageSet = resultMessageSet;
    }

    /** 1. 피드 등록 */
    @PostMapping()
    public ResponseEntity<Map<String, Object>> createNewFeed(@RequestBody @Valid RegisterFeedReq registerFeedReq,
                                                             Principal principal) {
        logger.info("[POST] /feed - {}", registerFeedReq);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = feedService.saveNewFeed(registerFeedReq, principal);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /** 2. 피드 목록 조회 */
    @GetMapping(value = "/{storeId}")
    public ResponseEntity<Map<String, Object>> getFeedList(@PathVariable(required = false) Long storeId,
                                                           @RequestParam(value = "page", required = false, defaultValue = "0") int pageNo,
                                                           @RequestParam(value = "size", required = false, defaultValue = "9") int size) {
        logger.info("[GET] /feed/{storeId} - {}", storeId);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = feedService.getFeedList(storeId, pageNo, size);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
            response.put("feedInfo", result.get("info"));
        } else {
//            response.put("result", resultMessageSet.FAIL);
//            response.put("message", result.get("message"));
            return null;
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /** 3. 피드 상세 조회*/
    @GetMapping("/detail/{feedId}")
    public ResponseEntity<Map<String, Object>> getFeedDetailInfo(@PathVariable Long feedId) {
        logger.info("[GET] /feed/detail/{feedId} - {}", feedId);

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

    /** 4. 피드 수정 */
//    @PutMapping()
//    public ResponseEntity<Map<String, Object>> updateFeedInfo() {
//        logger.info("[PUT] /feed ");
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

    /** 5. 피드 삭제 */
    @DeleteMapping("/{feedId}")
    public ResponseEntity<Map<String, Object>> deleteFeedInfo(@PathVariable Long feedId,
                                                              Principal principal) {
        logger.info("[DELETE] /feed/{feedId} - {}" + feedId);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = feedService.deleteFeedInfo(feedId, principal);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
