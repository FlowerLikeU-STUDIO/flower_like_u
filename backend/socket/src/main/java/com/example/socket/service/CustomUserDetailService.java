package com.example.socket.service;

import com.example.socket.entity.Consumer;
import com.example.socket.entity.Store;
import com.example.socket.repository.ConsumerRepository;
import com.example.socket.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailService implements UserDetailsService {

    private final ConsumerRepository consumerRepository;
    private final StoreRepository storeRepository;

    @Autowired
    public CustomUserDetailService(ConsumerRepository consumerRepository, StoreRepository storeRepository) {
        this.consumerRepository = consumerRepository;
        this.storeRepository = storeRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<Consumer> optConsumer = consumerRepository.findByUserId(username);
        if (optConsumer.isPresent())
            return optConsumer.get();
        Optional<Store> optStore = storeRepository.findByUserId(username);
        if (optStore.isPresent())
            return optStore.get();
        throw new IllegalArgumentException("해당 사용자가 없습니다");
    }
}