package com.example.socket.service;

import com.example.socket.domain.User;
import com.example.socket.domain.UserType;
import com.example.socket.entity.Consumer;
import com.example.socket.entity.Store;
import com.example.socket.repository.ConsumerRepository;
import com.example.socket.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    private final ConsumerRepository consumerRepository;
    private final StoreRepository storeRepository;

    @Autowired
    public UserServiceImpl(ConsumerRepository consumerRepository, StoreRepository storeRepository) {
        this.consumerRepository = consumerRepository;
        this.storeRepository = storeRepository;
    }

    public User getUser(String userType, Long id) {
        User user = new User();
        if (userType.equals("CONSUMER")) {
            Consumer consumer = consumerRepository.findById(id).orElseThrow(() -> {return new IllegalArgumentException("해당 id의 유저가 없습니다.");});
            user.setName(consumer.getNickname());
            user.setImgSrc(consumer.getProfile());
        } else {
            Store store = storeRepository.findById(id).orElseThrow(() -> {return new IllegalArgumentException("해당 id의 유저가 없습니다.");});
            user.setName(store.getStore());
            user.setImgSrc(store.getProfile());
        }
        return user;
    }
}
