package com.ssafy.fly.controller;

import com.ssafy.fly.common.message.ResultMessageSet;
import com.ssafy.fly.dto.request.BookCustomFlowerReq;
import com.ssafy.fly.dto.request.BookFeedFlowerReq;
import com.ssafy.fly.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/book")
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    /** 1. 꽃다발 예약(커스텀 꽃다발) */
    @PostMapping("/custom")
    public ResponseEntity<Map<String, Object>> bookCustomizedFlower(@RequestBody BookCustomFlowerReq bookCustomFlowerReq,
                                                                    Authentication authentication) {
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = bookService.registCustomFlowerBookInfo(bookCustomFlowerReq, authentication);

        if((boolean) result.get("result")) {
            response.put("result", ResultMessageSet.SUCCESS);
        } else {
            response.put("result", ResultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /** 2. 꽃다발 예약(피드) */
    @PostMapping("/feed")
    public ResponseEntity<Map<String, Object>> bookFeedFlower(@RequestBody BookFeedFlowerReq bookFeedFlower,
                                                              Authentication authentication) {
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = bookService.registFeedFlowerBookInfo(bookFeedFlower, authentication);

        if((boolean) result.get("result")) {
            response.put("result", ResultMessageSet.SUCCESS);
        } else {
            response.put("result", ResultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /** 3. 예약 상태 변경 */
    @PutMapping("/{bookId}")
    public ResponseEntity<Map<String, Object>> updateBookState(@PathVariable Long bookId,
                                                               Authentication authentication) {
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = bookService.updateBookState(bookId, authentication);

        if((boolean) result.get("result")) {
            response.put("result", ResultMessageSet.SUCCESS);
        } else {
            response.put("result", ResultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /** 4. 예약 목록 조회 */
    @GetMapping()
    public ResponseEntity<Map<String, Object>> getBookInfoList(@RequestParam(value = "page", required = false, defaultValue = "0") int pageNo,
                                                               @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                               @RequestParam(value = "filter", required = false, defaultValue = "") String filter,
                                                               Authentication authentication) {
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = bookService.getBookInfoList(pageNo, size, filter, authentication);

        if((boolean) result.get("result")) {
            response.put("result", ResultMessageSet.SUCCESS);
            response.put(filter + "Info", result.get("info"));
        } else {
            response.put("result", ResultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /** 5. 예약 목록 상세 조회(커스텀, 피드) */
    @GetMapping("/detail/{bookId}")
    public ResponseEntity<Map<String, Object>> getDetailReservationInfo(@PathVariable Long bookId,
                                                                        Authentication authentication) {
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = bookService.getDetailBookInfo(bookId, authentication);

        if((boolean) result.get("result")) {
            response.put("result", ResultMessageSet.SUCCESS);
            response.put("bookInfo", result.get("bookInfo"));
        } else {
            response.put("result", ResultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /** 6. 예약 취소 */
    @DeleteMapping("/{bookId}")
    public ResponseEntity<Map<String, Object>> cancelReservation(@PathVariable Long bookId,
                                                                 Authentication authentication) {
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = bookService.deleteBookInfo(bookId, authentication);

        if((boolean) result.get("result")) {
            response.put("result", ResultMessageSet.SUCCESS);
        } else {
            response.put("result", ResultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}