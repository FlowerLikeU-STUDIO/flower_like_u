package com.ssafy.fly.controller;

import com.ssafy.fly.common.util.ResultMessageSet;
import com.ssafy.fly.dto.request.BookCustomFlowerReq;
import com.ssafy.fly.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/book")
public class BookController {

    private final BookService bookService;
    private final ResultMessageSet resultMessageSet;

    @Autowired
    public BookController(BookService bookService,
                           ResultMessageSet resultMessageSet) {
        this.bookService = bookService;
        this.resultMessageSet = resultMessageSet;
    }

    // 1. 꽃다발 예약(커스텀 꽃다발)
    @PostMapping("/custom")
    public ResponseEntity<Map<String, Object>> bookCustomizedFlower(@RequestBody BookCustomFlowerReq bookCustomFlowerReq) {
        System.out.println("[POST] - /book/custom " + bookCustomFlowerReq);

        Map<String, Object> response = new HashMap<>();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
