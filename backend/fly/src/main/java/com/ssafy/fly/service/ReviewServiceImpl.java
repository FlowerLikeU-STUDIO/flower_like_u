package com.ssafy.fly.service;

import com.ssafy.fly.database.mysql.entity.BookEntity;
import com.ssafy.fly.database.mysql.entity.ConsumerEntity;
import com.ssafy.fly.database.mysql.entity.ReviewEntity;
import com.ssafy.fly.database.mysql.entity.StoreEntity;
import com.ssafy.fly.database.mysql.enumtype.BookState;
import com.ssafy.fly.database.mysql.repository.BookRepository;
import com.ssafy.fly.database.mysql.repository.ConsumerRepository;
import com.ssafy.fly.database.mysql.repository.ReviewRepository;
import com.ssafy.fly.database.mysql.repository.StoreRepository;
import com.ssafy.fly.dto.request.ReviewPostReqDto;
import com.ssafy.fly.dto.response.ReviewInfoRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.*;
import java.util.function.Supplier;

@Service
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final ConsumerRepository consumerRepository;
    private final StoreRepository storeRepository;
    private final BookRepository bookRepository;

    @Autowired
    public ReviewServiceImpl(ReviewRepository reviewRepository,
                             ConsumerRepository consumerRepository,
                             StoreRepository storeRepository,
                             BookRepository bookRepository) {
        this.reviewRepository = reviewRepository;
        this.consumerRepository = consumerRepository;
        this.storeRepository = storeRepository;
        this.bookRepository = bookRepository;
    }


    public Map<String, Object> getList(Long storeId, Pageable pageable) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        StoreEntity store = storeRepository.findById(storeId).orElse(null);
        if (store == null) {
            message = "존재하지 않는 판매자 아이디입니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        Page<ReviewEntity> searchList = reviewRepository.findByStoreId(store, pageable);

        List<ReviewInfoRes> resultList = new ArrayList<>();
        for (ReviewEntity curEntity : searchList) {
            ReviewInfoRes reviewInfo = ReviewInfoRes.builder()
                    .reviewId(curEntity.getId())
                    .writer(curEntity.getConsumerId().getName())
                    .writerProfile(curEntity.getConsumerId().getProfile())
                    .content(curEntity.getContent())
                    .rating(curEntity.getRating())
                    .regDate(curEntity.getDateOnly())
                    .build();
            resultList.add(reviewInfo);
        }

        result.put("content", resultList);
        result.put("pageable", searchList.getPageable());
        result.put("sort", searchList.getSort());
        result.put("first", searchList.isFirst());
        result.put("last", searchList.isLast());
        result.put("empty", searchList.isEmpty());
        result.put("totalPages", searchList.getTotalPages());
        result.put("pageSize", searchList.getPageable().getPageSize());
        result.put("totalElements", searchList.getTotalElements());
        result.put("curPage", searchList.getPageable().getPageNumber());
        result.put("number", searchList.getNumber());
        result.put("result", true);
        return result;
    }

    public Map<String, Object> create(ReviewPostReqDto reviewPostReqDto, Principal principal) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        ConsumerEntity consumer = consumerRepository.findByUserIdAndWithdrawal(principal.getName(), false);
        if (consumer == null) {
            message = "잘못된 토큰 정보입니다.";
            System.out.println(message);
            result.put("message", message);
            result.put("result", false);
            return result;
        }

        StoreEntity store = storeRepository.findByIdAndWithdrawal(reviewPostReqDto.getStoreId(), false);
        if (store == null) {
            message = "존재하지 않는 판매자 ID(Long Type) 입니다.";
            System.out.println(message);
            result.put("message", message);
            result.put("result", false);
            return result;
        }

        BookEntity book = bookRepository.findById(reviewPostReqDto.getBookId()).orElse(null);
        if (book == null) {
            message = "존재하지 않는 예약 ID(Long Type) 입니다.";
            System.out.println(message);
            result.put("message", message);
            result.put("result", false);
            return result;
        }

        if (!principal.getName().equals(book.getConsumerId().getUserId()) ||
                book.getStoreId().getId() != store.getId()) {
            message = "잘못된 접근입니다.";
            System.out.println(message);
            result.put("message", message);
            result.put("result", false);
            return result;
        }

        if (!book.getState().equals(BookState.RECIPT)) {
            message = "후기를 작성할 수 없는 단계입니다.";
            System.out.println(message);
            result.put("message", message);
            result.put("result", false);
            return result;
        }

        ReviewEntity reviewEntity = ReviewEntity.builder()
                .content(reviewPostReqDto.getContent())
                .rating(reviewPostReqDto.getRating())
                .regDate(new Date())
                .consumerId(consumer)
                .storeId(store)
                .bookId(book)
                .build();
        reviewRepository.save(reviewEntity);

        if (bookRepository.updateBookState(book.getId(), BookState.DONE) > 0) {
            result.put("result", true);
        } else {
            message = "서버 문제로 요청 작업을 완료하지 못하였습니다.";
            result.put("message", message);
            result.put("result", false);
        }

        return result;
    }

    @Override
    public Map<String, Object> getReviewInfo(Long reviewId, Principal principal) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        ConsumerEntity consumer = consumerRepository.findByUserIdAndWithdrawal(principal.getName(), false);
        if (consumer == null) {
            message = "잘못된 토큰 정보입니다.";
            System.out.println(message);
            result.put("message", message);
            result.put("result", false);
            return result;
        }

        ReviewEntity review = reviewRepository.findById(reviewId).orElse(null);
        if (review == null) {
            message = "존재하지 않는 리뷰 아이디(Long Type) 입니다.";
            System.out.println(message);
            result.put("message", message);
            result.put("result", false);
            return result;
        }

        if (!principal.getName().equals(review.getConsumerId().getUserId())) {
            message = "잘못된 접근입니다.";
            System.out.println(message);
            result.put("message", message);
            result.put("result", false);
            return result;
        }

        ReviewInfoRes reviewInfo = ReviewInfoRes.builder()
                .reviewId(review.getId())
                .writer(review.getConsumerId().getName())
                .content(review.getContent())
                .rating(review.getRating())
                .build();

        result.put("result", true);
        result.put("reviewInfo", reviewInfo);
        return result;
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
        return length == 0 ? 0 : ratingList.stream().map(ReviewEntity::getRating).reduce(0.0, Double::sum) / length;
    }
}
