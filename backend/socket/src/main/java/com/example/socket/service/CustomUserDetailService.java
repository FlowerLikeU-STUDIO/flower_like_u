package com.example.socket.service;

import com.example.socket.domain.JwtUserInfo;
import com.example.socket.entity.Consumer;
import com.example.socket.entity.Store;
import com.example.socket.repository.ConsumerRepository;
import com.example.socket.repository.StoreRepository;
import com.example.socket.utils.JwtConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailService {

    private final ConsumerRepository consumerRepository;
    private final StoreRepository storeRepository;

    @Autowired
    public CustomUserDetailService(ConsumerRepository consumerRepository, StoreRepository storeRepository) {
        this.consumerRepository = consumerRepository;
        this.storeRepository = storeRepository;
    }

    public UserDetails loadUserByUsername(String token) throws UsernameNotFoundException {
        JwtUserInfo jwtUserInfo = JwtConverter.getUserPk(token);
        if (jwtUserInfo.getRole().equals("CONSUMER")) {
            Optional<Consumer> optConsumer = consumerRepository.findById(Long.parseLong(jwtUserInfo.getSub()));
            if (optConsumer.isPresent())
                return optConsumer.get();
        }
        Optional<Store> optStore = storeRepository.findById(Long.parseLong(jwtUserInfo.getSub()));
        if (optStore.isPresent())
            return optStore.get();
        throw new IllegalArgumentException("해당 사용자가 없습니다");
    }
}