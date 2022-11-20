package com.ssafy.fly.common.exception;

import com.ssafy.fly.common.message.ResultMessageSet;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ExceptionAdvisor {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> validationError(MethodArgumentNotValidException exception, HttpServletRequest request) {
        Map<String, Object> response = new HashMap<>();
        BindingResult bindingResult = exception.getBindingResult();
        String objName = bindingResult.getObjectName();

        StringBuilder messages = new StringBuilder();
        for (FieldError fieldError : bindingResult.getFieldErrors()) {
            String message = String.format("[%s](은)는 %s.\n", fieldError.getField(), fieldError.getDefaultMessage());
            messages.append(message);
        }
        response.put("result", ResultMessageSet.FAIL);
        response.put("message", messages.toString());

        if("registerReq".equals(objName) || "changePwdReq".equals(objName)) {
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } else if("findIdReq".equals(objName)) {
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<Map<String, Object>> customExceptionHandler(CustomException exception) {
        Map<String, Object> response = new HashMap<>();

        response.put("result", ResultMessageSet.FAIL);
        response.put("message", exception.getMessage());

        return new ResponseEntity<>(response, exception.getStatusCode());
    }
}
