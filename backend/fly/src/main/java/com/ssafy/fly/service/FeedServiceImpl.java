package com.ssafy.fly.service;

import com.ssafy.fly.database.mysql.entity.FeedEntity;
import com.ssafy.fly.database.mysql.entity.FeedImageEntity;
import com.ssafy.fly.database.mysql.entity.StoreEntity;
import com.ssafy.fly.database.mysql.repository.FeedImageRepository;
import com.ssafy.fly.database.mysql.repository.FeedRepository;
import com.ssafy.fly.database.mysql.repository.StoreRepository;
import com.ssafy.fly.dto.request.RegisterFeedReq;
import com.ssafy.fly.dto.response.FeedRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.Principal;
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
    public Map<String, Object> saveNewFeed(RegisterFeedReq registerFeedReq, Principal principal) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        StoreEntity store = storeRepository.findByUserIdAndWithdrawal(principal.getName(), false);

        if (store == null) {
            message = "잘못된 토큰 정보입니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        } else {
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
        }

        return result;
    }

    // 2. 피드 목록 조회
    @Override
    public Map<String, Object> getFeedList(Long storeId, int pageNo, int size, Principal principal) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        StoreEntity store = null;
        // 판매자가 본인 피드 목록을 조회하는 경우
        if(storeId == null) store = storeRepository.findByUserIdAndWithdrawal(principal.getName(), false);
        // 구매자가 판매자 피드 목록을 조회하는 경우
        else store = storeRepository.findById(storeId).orElse(null);

        if(store == null) {
            message = "존재하지 않는 판매자 아이디입니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        Pageable pageable = PageRequest.of((pageNo > 0 ? pageNo - 1 : 0), size);
        Page<FeedEntity> searchList = feedRepository.findByStoreIdAndRemoval(store, false, pageable);
        Map<String, Object> info = new HashMap<>();

        if(!searchList.isEmpty()) {
            List<FeedRes.FeedListElement> resultList = new ArrayList<>();
            for(FeedEntity curEntity : searchList) {
                FeedRes.FeedListElement feedInfo = FeedRes.FeedListElement.builder()
                        .feedId(curEntity.getId())
                        .name(curEntity.getName())
                        .image(curEntity.getImages().size() > 0 ? curEntity.getImages().get(0).getImage() : null)
                        .price(curEntity.getPrice())
                        .content(curEntity.getContent())
                        .build();
                resultList.add(feedInfo);
            }
            info.put("maxPage", searchList.getTotalPages());
            info.put("list", resultList);
            result.put("result", true);
            result.put("info", info);
            return result;
        } else {
            message = "존재하지 않는 페이지입니다.";
            result.put("result", false);
            result.put("message", message);
            return result;
        }
    }

    // 3. 피드 상세 조회
    @Override
    public Map<String, Object> getFeedDetailInfo(Long feedId, Principal principal) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        FeedEntity feed = feedRepository.findByIdAndRemoval(feedId, false);
        if(feed == null) {
            message = "존재하지 않는 피드 아이디(Long Type) 입니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        List<String> feedImages = new ArrayList<>();
        for(FeedImageEntity imageEntity : feed.getImages()) {
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
    public Map<String, Object> updateFeedInfo(Principal principal) {
        return null;
    }

    // 5. 피드 삭제
    @Override
    public Map<String, Object> deleteFeedInfo(Long feedId, Principal principal) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        FeedEntity feed = feedRepository.findByIdAndRemoval(feedId, false);
        if(feed == null) {
            message = "존재하지 않는 피드 아이디(Long Type) 입니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        StoreEntity store = storeRepository.findByUserIdAndWithdrawal(principal.getName(), false);
        if(store == null) {
            message = "존재하지 않는 계정 입니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        if(!feed.getStoreId().getUserId().equals(store.getUserId())) {
            message = "삭제 권한이 없는 계정입니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        if(feedRepository.feedRemove(feedId) > 0) {
            result.put("result", true);
        } else {
            message = "서버 문제로 데이터 삭제에 실패하였습니다.";
            result.put("result", true);
        }
        result.put("message", message);
        return result;
    }
}
