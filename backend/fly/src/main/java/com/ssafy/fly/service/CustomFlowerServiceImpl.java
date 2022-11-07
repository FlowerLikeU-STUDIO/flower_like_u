package com.ssafy.fly.service;

import com.ssafy.fly.database.mongodb.document.CustomFlowerDocument;
import com.ssafy.fly.database.mongodb.repository.CustomFlowerMongoRepository;
import com.ssafy.fly.database.mysql.entity.ConsumerEntity;
import com.ssafy.fly.database.mysql.entity.CustomFlowerEntity;
import com.ssafy.fly.database.mysql.repository.ConsumerRepository;
import com.ssafy.fly.database.mysql.repository.CustomFlowerRepository;
import com.ssafy.fly.dto.request.CustomFlowerRegReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.Principal;
import java.util.*;

@Service("customFlowerService")
@Transactional
public class CustomFlowerServiceImpl implements CustomFlowerService {

    private static final int FEED_PAEG_SIZE = 9;

    private final ConsumerRepository consumerRepository;
    private final CustomFlowerRepository customFlowerRepository;
    private final CustomFlowerMongoRepository customFlowerMongoRepository;

    @Autowired
    public CustomFlowerServiceImpl(ConsumerRepository consumerRepository,
                                   CustomFlowerRepository customFlowerRepository,
                                   CustomFlowerMongoRepository customFlowerMongoRepository) {
        this.consumerRepository = consumerRepository;
        this.customFlowerRepository = customFlowerRepository;
        this.customFlowerMongoRepository = customFlowerMongoRepository;
    }

    // 1. 커스텀 꽃다발 정보 등록
    @Override
    public Map<String, Object> saveCustomFlower(CustomFlowerRegReq customFlowerRegReq, Principal principal) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        ConsumerEntity consumer = consumerRepository.findByUserIdAndWithdrawal(principal.getName(), false);

        if (consumer == null) {
            message = "잘못된 토큰 정보입니다.";
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        int flowerNum = customFlowerRegReq.getFlowers().size();
        List<CustomFlowerDocument.Flowers> flowerList = new ArrayList<>();
        for (int i = 0; i < flowerNum; i++) {
            CustomFlowerDocument.Flowers flower = CustomFlowerDocument.Flowers.builder()
                    .name(customFlowerRegReq.getFlowers().get(i).getName())
                    .cnt(customFlowerRegReq.getFlowers().get(i).getCnt())
                    .color(customFlowerRegReq.getFlowers().get(i).getColor())
                    .build();
            flowerList.add(flower);
        }

        CustomFlowerDocument customizeInfo = CustomFlowerDocument.builder()
                .packing(CustomFlowerDocument.Packing.builder()
                        .material(customFlowerRegReq.getPacking().getMaterial())
                        .color(customFlowerRegReq.getPacking().getColor())
                        .build())
                .size(customFlowerRegReq.getSize())
                .flowers(flowerList)
                .price(customFlowerRegReq.getPrice())
                .build();

        String designId = customFlowerMongoRepository.insert(customizeInfo).getId();

        boolean success;
        if (designId != null) {
            CustomFlowerEntity customFlower = CustomFlowerEntity.builder()
                    .consumerId(consumer)
                    .designId(designId)
                    .image(customFlowerRegReq.getImage())
                    .removal(false)
                    .build();
            customFlowerRepository.save(customFlower);
            success = true;
        } else {
            success = false;
        }

        if (success) {
            result.put("result", true);
        } else {
            message = "서버 문제로 요청 작업을 완료하지 못하였습니다.";
            result.put("result", false);
            result.put("message", message);
        }

        return result;
    }

    // 2. 커스텀 꽃다발 목록 조회
    @Override
    public Map<String, Object> getCustomFlowerList(int pageNo, int size, Principal principal) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        ConsumerEntity consumer = consumerRepository.findByUserIdAndWithdrawal(principal.getName(), false);
        if(consumer == null) {
            message = "잘못된 토큰 정보입니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        Pageable pageable = PageRequest.of((pageNo > 0 ? pageNo - 1 : 0), size);
        Page<CustomFlowerEntity> resultList = customFlowerRepository.findAllByConsumerId(consumer, pageable);

        if(resultList.getContent().size() > 0) {
            result.put("result", true);
            result.put("maxPage", resultList.getTotalPages());
            result.put("list", resultList.getContent());
        } else {
            message = "표시할 페이지가 존재하지 않습니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
        }
        return result;
    }

    // 3. 커스텀 꽃다발 상세 정보 조회
    @Override
    public Map<String, Object> getCustomFlowerDetails(String flowerId, Principal principal) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        ConsumerEntity consumer = consumerRepository.findByUserIdAndWithdrawal(principal.getName(), false);
        if (consumer == null) {
            message = "잘못된 토큰 정보입니다.";
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        CustomFlowerEntity basicInfo = customFlowerRepository.findByDesignIdAndRemoval(flowerId, false);
        if(!basicInfo.getConsumerId().getUserId().equals(principal.getName())) {
            message = "잘못된 토큰 정보입니다.";
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        CustomFlowerDocument detailInfo = customFlowerMongoRepository.findById(flowerId).orElse(null);

        if(basicInfo == null || detailInfo == null) {
            message = "존재하지 않는 커스텀 꽃다발 아이디(String Type) 입니다.";
            result.put("result", false);
            result.put("message", message);
        } else {
            result.put("result", true);
            result.put("basics", basicInfo);
            result.put("details", detailInfo);
        }

        return result;
    }

    // 4. 커스텀 꽃다발 정보 삭제(작업 우선 순위가 낮아 추후 구현)
    @Override
    public Map<String, Object> removeCustomFlower(String flowerId, Principal principal) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        CustomFlowerEntity customFlower = customFlowerRepository.findByDesignIdAndRemoval(flowerId, false);
        if(customFlower == null) {
            message = "존재하지 않는 커스텀 꽃다발 아이디(String Type) 입니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        ConsumerEntity consumer = consumerRepository.findByUserIdAndWithdrawal(principal.getName(), false);
        if (consumer == null) {
            message = "잘못된 토큰 정보입니다.";
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        if(!customFlower.getConsumerId().getUserId().equals(principal.getName())) {
            message = "삭제 권한이 없는 계정입니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        if(customFlowerRepository.CustomFlowerRemove(flowerId) > 0) {
            customFlowerMongoRepository.deleteById(flowerId);
            result.put("result", true);
        } else {
            message = "서버 문제로 데이터 삭제에 실패하였습니다.";
            result.put("result", false);
        }
        result.put("message", message);
        return result;
    }
}
