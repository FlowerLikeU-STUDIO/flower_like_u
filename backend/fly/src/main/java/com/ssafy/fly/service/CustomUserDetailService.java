package com.ssafy.fly.service;

import com.ssafy.fly.common.exception.CustomException;
import com.ssafy.fly.common.util.CustomUserDetail;
import com.ssafy.fly.common.vo.JwtUserInfo;
import com.ssafy.fly.database.mysql.entity.ConsumerEntity;
import com.ssafy.fly.database.mysql.entity.StoreEntity;
import com.ssafy.fly.database.mysql.repository.ConsumerRepository;
import com.ssafy.fly.database.mysql.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public CustomUserDetail loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<ConsumerEntity> optConsumer = consumerRepository.findByUserIdAndWithdrawal(username, false);
        if (optConsumer.isPresent()) return optConsumer.get();

        Optional<StoreEntity> optStore = storeRepository.findByUserIdAndWithdrawal(username, false);
        if (optStore.isPresent()) return optStore.get();

        throw new CustomException("존재하지 않는 계정입니다.", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public CustomUserDetail loadKakaoUserByEmail(String email) {
        Optional<ConsumerEntity> optConsumer = consumerRepository.findByUserIdAndWithdrawal(email, false);
        if (optConsumer.isPresent()) return optConsumer.get();
        else return null;
    }

    public UserDetails loadUserByUsername(JwtUserInfo jwtUserInfo) throws UsernameNotFoundException {
        if (jwtUserInfo.getRole().equals("CONSUMER")) {
            Optional<ConsumerEntity> optConsumer = consumerRepository.findById(Long.parseLong(jwtUserInfo.getSub()));
            if (optConsumer.isPresent())
                return optConsumer.get();
        }
        Optional<StoreEntity> optStore = storeRepository.findById(Long.parseLong(jwtUserInfo.getSub()));
        if (optStore.isPresent())
            return optStore.get();

        throw new CustomException("존재하지 않는 계정입니다.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}