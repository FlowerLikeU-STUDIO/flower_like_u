package com.example.socket.service;

import com.example.socket.domain.User;

public interface UserService {
    public User getUser(String userType, Long id);
}
