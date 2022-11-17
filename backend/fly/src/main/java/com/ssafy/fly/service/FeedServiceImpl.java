package com.ssafy.fly.service;

import com.ssafy.fly.common.exception.CustomException;
import com.ssafy.fly.common.util.CustomUserDetail;
import com.ssafy.fly.database.mysql.entity.FeedEntity;
import com.ssafy.fly.database.mysql.entity.FeedImageEntity;
import com.ssafy.fly.database.mysql.entity.StoreEntity;
import com.ssafy.fly.database.mysql.enumtype.UserType;
import com.ssafy.fly.database.mysql.repository.FeedImageRepository;
import com.ssafy.fly.database.mysql.repository.FeedRepository;
import com.ssafy.fly.database.mysql.repository.StoreRepository;
import com.ssafy.fly.dto.request.RegisterFeedReq;
import com.ssafy.fly.dto.response.FeedRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("feedService")
@Transactional
public class FeedServiceImpl implements FeedService {

    private final FeedRepository feedRepository;
    private final FeedImageRepository feedImageRepository;
    private final StoreRepository storeRepository;

    @Autowired
    public FeedServiceImpl(FeedRepository feedRepository,
                           FeedImageRepository feedImageRepository,
                           StoreRepository storeRepository) {
        this.feedRepository = feedRepository;
        this.feedImageRepository = feedImageRepository;
        this.storeRepository = storeRepository;
    }

    // 1. 피드 등록
    @Override
    public Map<String, Object> saveNewFeed(RegisterFeedReq registerFeedReq, Authentication authentication) {
        Map<String, Object> result = new HashMap<>();
        HttpStatus statusCode = HttpStatus.CREATED;

        Long userPk = ((CustomUserDetail) authentication.getPrincipal()).getUserPk();
        String userType = ((CustomUserDetail) authentication.getPrincipal()).getUserType();

        if(!UserType.STORE.toString().equals(userType)) {
            throw new CustomException("판매자만 이용 가능한 서비스입니다.", statusCode);
        }

        StoreEntity store = storeRepository.findByIdAndWithdrawal(userPk, false).orElse(null);

        // 피드 정보 저장
        FeedEntity feedEntity = FeedEntity.builder()
                .storeId(store)
                .name(registerFeedReq.getName())
                .price(registerFeedReq.getPrice())
                .content(registerFeedReq.getContent())
                .removal(false)
                .build();
        FeedEntity feedId = feedRepository.save(feedEntity);

        // 피드 이미지 저장
        List<FeedImageEntity> images = new ArrayList<>();
        for (String image : registerFeedReq.getImage()) {
            FeedImageEntity imageEntity = FeedImageEntity.builder()
                    .feedId(feedId)
                    .image(image)
                    .build();
            images.add(imageEntity);
        }
        feedImageRepository.saveAll(images);

        result.put("result", true);
        return result;
    }

    // 2. 피드 목록 조회
    @Override
    public Map<String, Object> getFeedList(Long storeId, int pageNo, int size) {
        Map<String, Object> result = new HashMap<>();
        HttpStatus statusCode = HttpStatus.OK;

        StoreEntity store = storeRepository.findById(storeId).orElse(null);

        if (store == null) {
            throw new CustomException("존재하지 않는 판매자 아이디입니다.", statusCode);
        }

        Pageable pageable = PageRequest.of((pageNo > 0 ? pageNo - 1 : 0), size, Sort.by("id").descending());
        Page<FeedEntity> searchList = feedRepository.findByStoreIdAndRemoval(store, false, pageable);

        List<FeedRes.FeedListElement> resultList = new ArrayList<>();
        for (FeedEntity curEntity : searchList) {
            FeedRes.FeedListElement feedInfo = FeedRes.FeedListElement.builder()
                    .feedId(curEntity.getId())
                    .name(curEntity.getName())
                    .image(curEntity.getImages().size() > 0 ? curEntity.getImages().get(0).getImage() : null)
                    .price(curEntity.getPrice())
                    .content(curEntity.getContent())
                    .build();
            resultList.add(feedInfo);
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

    // 3. 피드 상세 조회
    @Override
    public Map<String, Object> getFeedDetailInfo(Long feedId) {
        Map<String, Object> result = new HashMap<>();
        HttpStatus statusCode = HttpStatus.OK;

        FeedEntity feed = feedRepository.findByIdAndRemoval(feedId, false).orElse(null);
        if (feed == null) {
            throw new CustomException("존재하지 않는 피드 아이디(Long Type) 입니다.", statusCode);
        }

        List<String> feedImages = new ArrayList<>();
        for (FeedImageEntity imageEntity : feed.getImages()) {
            feedImages.add(imageEntity.getImage());
        }

        FeedRes.FeedDetailRes feedInfo = FeedRes.FeedDetailRes.builder()
                .feedId(feed.getId())
                .name(feed.getName())
                .price(feed.getPrice())
                .content(feed.getContent())
                .image(feedImages)
                .build();

        result.put("result", true);
        result.put("feedInfo", feedInfo);

        return result;
    }

    // 4. 피드 수정
    @Override
    public Map<String, Object> updateFeedInfo(Authentication authentication) {
        return null;
    }

    // 5. 피드 삭제
    @Override
    public Map<String, Object> deleteFeedInfo(Long feedId, Authentication authentication) {
        Map<String, Object> result = new HashMap<>();
        HttpStatus statusCode = HttpStatus.CREATED;

        Long userPk = ((CustomUserDetail) authentication.getPrincipal()).getUserPk();
        String userType = ((CustomUserDetail) authentication.getPrincipal()).getUserType();

        if(!UserType.STORE.toString().equals(userType)) {
            throw new CustomException("판매자만 이용 가능한 서비스입니다.", statusCode);
        }

        FeedEntity feed = feedRepository.findByIdAndRemoval(feedId, false).orElse(null);
        if (feed == null) {
            throw new CustomException("존재하지 않는 피드 아이디(Long Type) 입니다.", statusCode);
        }

        if (!feed.getStoreId().getId().equals(userPk)) {
            throw new CustomException("삭제 권한이 없는 계정입니다.", statusCode);
        }

        if (feedRepository.feedRemove(feedId) > 0) {
            result.put("result", true);
        } else {
            throw new CustomException("서버 문제로 데이터 삭제에 실패하였습니다.", statusCode);
        }

        return result;
    }
}