package com.example.socket.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class BaseResponseDto<T> {
    String message;
    T response;

    public BaseResponseDto(String message, T response) {
        this.response = response;
        this.message = message;
    }
}
