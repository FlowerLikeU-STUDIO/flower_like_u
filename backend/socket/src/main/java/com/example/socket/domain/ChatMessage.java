package com.example.socket.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChatMessage {

    private MessageType messageType;
    private String content;
    private String address;
}