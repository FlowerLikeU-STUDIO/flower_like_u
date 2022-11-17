package com.ssafy.fly.controller;

import com.ssafy.fly.common.util.ResultMessageSet;
import com.ssafy.fly.dto.request.RegisterFeedReq;
import com.ssafy.fly.service.FeedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

//@CrossOrigin(origins = "*", allowedHeaders = "Authorization")
@RestController
@RequestMapping("/feed")
public class FeedController {

    //private final Logger logger = LogManager.getLogger(FeedController.class);

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
                                                             Authentication authentication) {
        //logger.info("[POST] /feed - {}", registerFeedReq);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = feedService.saveNewFeed(registerFeedReq, authentication);

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
        //logger.info("[GET] /feed/{storeId} - {}", storeId);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = feedService.getFeedList(storeId, pageNo, size);

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

    /** 3. 피드 상세 조회 */
    @GetMapping("/detail/{feedId}")
    public ResponseEntity<Map<String, Object>> getFeedDetailInfo(@PathVariable Long feedId) {
        //logger.info("[GET] /feed/detail/{feedId} - {}", feedId);

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
//        return new ResponseEntity<>(null, HttpStatus.CREATED);
//    }

    /** 5. 피드 삭제 */
    @DeleteMapping("/{feedId}")
    public ResponseEntity<Map<String, Object>> deleteFeedInfo(@PathVariable Long feedId,
                                                              Authentication authentication) {
        //logger.info("[DELETE] /feed/{feedId} - {}" + feedId);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = feedService.deleteFeedInfo(feedId, authentication);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
