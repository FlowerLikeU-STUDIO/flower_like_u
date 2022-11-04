package com.ssafy.fly.common.exception;

import com.ssafy.fly.common.util.ResultMessageSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ExceptionAdvisor {

    ResultMessageSet resultMessageSet;

    @Autowired
    ExceptionAdvisor(ResultMessageSet resultMessageSet) {
        this.resultMessageSet = resultMessageSet;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> validationError(MethodArgumentNotValidException exception) {
        Map<String, Object> response = new HashMap<>();
        BindingResult bindingResult = exception.getBindingResult();

        StringBuilder messages = new StringBuilder();
        for (FieldError fieldError : bindingResult.getFieldErrors()) {
            String message = String.format("[%s](은)는 %s.\n", fieldError.getField(), fieldError.getDefaultMessage());
            messages.append(message);
        }
        response.put("result", resultMessageSet.FAIL);
        response.put("message", messages.toString());

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
