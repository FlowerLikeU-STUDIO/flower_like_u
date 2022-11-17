package com.ssafy.fly.service;

import com.ssafy.fly.common.exception.CustomException;
import com.ssafy.fly.common.util.CustomUserDetail;
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
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.*;

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
        HttpStatus statusCode = HttpStatus.OK;

        StoreEntity store = storeRepository.findById(storeId).orElse(null);
        if (store == null) {
            throw new CustomException( "존재하지 않는 판매자 아이디입니다.", statusCode);
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

    public Map<String, Object> create(ReviewPostReqDto reviewPostReqDto, Authentication authentication) {
        Map<String, Object> result = new HashMap<>();
        HttpStatus statusCode = HttpStatus.CREATED;

        Long userPk = ((CustomUserDetail) authentication.getPrincipal()).getUserPk();

        StoreEntity store = storeRepository.findByIdAndWithdrawal(reviewPostReqDto.getStoreId(), false).orElse(null);
        if (store == null) {
            throw new CustomException("존재하지 않는 판매자 ID(Long Type) 입니다.", statusCode);
        }

        BookEntity book = bookRepository.findById(reviewPostReqDto.getBookId()).orElse(null);
        if (book == null) {
            throw new CustomException("존재하지 않는 예약 ID(Long Type) 입니다.", statusCode);
        }

        if (!userPk.equals(book.getConsumerId().getId()) ||
                !store.getId().equals(book.getStoreId().getId())) {
            throw new CustomException("해당 예약 정보에 접근할 수 없는 계정입니다.", statusCode);
        }

        if (!book.getState().equals(BookState.RECIPT)) {
            throw new CustomException("후기를 작성할 수 없는 단계입니다.", statusCode);
        }

        ConsumerEntity consumer = consumerRepository.findByIdAndWithdrawal(userPk, false).orElse(null);
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
            throw new CustomException("서버 문제로 요청 작업을 완료하지 못하였습니다.", statusCode);
        }

        return result;
    }

    @Override
    public Map<String, Object> getReviewInfo(Long reviewId, Authentication authentication) {
        Map<String, Object> result = new HashMap<>();
        HttpStatus statusCode = HttpStatus.OK;

        Long userPk = ((CustomUserDetail) authentication.getPrincipal()).getUserPk();

        ReviewEntity review = reviewRepository.findById(reviewId).orElse(null);
        if (review == null) {
            throw new CustomException("존재하지 않는 리뷰 아이디(Long Type) 입니다.", statusCode);
        }

        if (!userPk.equals(review.getConsumerId().getId())) {
            throw new CustomException("잘못된 접근입니다.", statusCode);
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
}
