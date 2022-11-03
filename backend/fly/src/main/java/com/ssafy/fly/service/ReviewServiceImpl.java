package com.ssafy.fly.service;

import com.ssafy.fly.database.mysql.entity.ConsumerEntity;
import com.ssafy.fly.database.mysql.entity.ReviewEntity;
import com.ssafy.fly.database.mysql.entity.StoreEntity;
import com.ssafy.fly.database.mysql.repository.ConsumerRepository;
import com.ssafy.fly.database.mysql.repository.ReviewRepository;
import com.ssafy.fly.database.mysql.repository.StoreRepository;
import com.ssafy.fly.dto.request.ReviewPostReqDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Supplier;

@Service
public class ReviewServiceImpl implements ReviewService{
    private final ReviewRepository reviewRepository;
    private final StoreRepository storeRepository;
    private final ConsumerRepository consumerRepository;

    @Autowired
    public ReviewServiceImpl(ReviewRepository reviewRepository, StoreRepository storeRepository, ConsumerRepository consumerRepository) {
        this.reviewRepository = reviewRepository;
        this.storeRepository = storeRepository;
        this.consumerRepository = consumerRepository;
    }


    public List<ReviewEntity> getList(Long storeId, Pageable pageable) {
        StoreEntity storeEntity = storeRepository.findById(storeId).orElseThrow(new Supplier<IllegalArgumentException>() {
            @Override
            public IllegalArgumentException get() {
                return new IllegalArgumentException("해당 id의 store가 없습니다.");
            }
        });
        return reviewRepository.findAllByStoreId(storeEntity, pageable);
    }

    public void create(ReviewPostReqDto reviewPostReqDto) {
        ReviewEntity reviewEntity = new ReviewEntity();
        reviewEntity.setContent(reviewPostReqDto.getContent());
        reviewEntity.setRating(reviewPostReqDto.getRating());
        reviewEntity.setStoreId(storeRepository.findById(reviewPostReqDto.getStoreId()).orElseThrow(new Supplier<IllegalArgumentException>() {
            @Override
            public IllegalArgumentException get() {
                return new IllegalArgumentException("해당 id의 store가 없습니다");
            }
        }));
        reviewEntity.setConsumerId(consumerRepository.findById(reviewPostReqDto.getConsumerId()).orElseThrow(new Supplier<IllegalArgumentException>() {
            @Override
            public IllegalArgumentException get() {
                return new IllegalArgumentException("해당 id의 consumer가 없습니다.");
            }
        }));
        reviewRepository.save(reviewEntity);
    }

    public Double getRating(Long storeId) {
        StoreEntity storeEntity = storeRepository.findById(storeId).orElseThrow(new Supplier<IllegalArgumentException>() {
            @Override
            public IllegalArgumentException get() {
                return new IllegalArgumentException("해당 id의 store가 없습니다.");
            }
        });
        List<ReviewEntity> ratingList = reviewRepository.findAllByStoreId(storeEntity);
        int length = ratingList.size();
        return ratingList.stream().map(ReviewEntity::getRating).reduce(0.0,Double::sum) / length;
    }
}
