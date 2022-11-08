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
import com.ssafy.fly.dto.response.ReviewListRes;
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


    public Map<String, Object> getList(Long storeId, Pageable pageable, Principal principal) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        StoreEntity store = null;
        // 판매자가 본인 후기 목록을 조회하는 경우
        if(storeId == null) store = storeRepository.findByUserIdAndWithdrawal(principal.getName(), false);
        // 구매자가 판매자 후기 목록을 조회하는 경우
        else store = storeRepository.findById(storeId).orElse(null);

        if(store == null) {
            message = "존재하지 않는 판매자 아이디입니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        Page<ReviewEntity> searchList = reviewRepository.findByStoreId(store, pageable);

        if(searchList.getContent().size() > 0) {
            List<ReviewListRes> resultList = new ArrayList<>();
            for(ReviewEntity curEntity : searchList) {
                ReviewListRes reviewInfo = ReviewListRes.builder()
                        .reviewId(curEntity.getId())
                        .writer(curEntity.getConsumerId().getName())
                        .content(curEntity.getContent())
                        .rating(curEntity.getRating())
                        .build();
                resultList.add(reviewInfo);
            }
            result.put("maxPage", searchList.getTotalPages());
            result.put("reviewList", resultList);
            result.put("result", true);
        } else {
            message = "존재하지 않는 페이지입니다.";
            result.put("result", false);
            result.put("message", message);
        }

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
