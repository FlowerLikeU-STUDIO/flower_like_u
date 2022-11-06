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

    @Override
    public Map<String, Object> saveCustomFlower(CustomFlowerRegReq customFlowerRegReq, Principal principal) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        String userId = principal.getName();
        ConsumerEntity consumer = consumerRepository.findByUserIdAndWithdrawal(userId, false);

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
        pageable = PageRequest.of(pageNo, FEED_PAEG_SIZE);
        Page<CustomFlowerEntity> resultList = customFlowerRepository.findAllByConsumerId(consumer, pageable);

        if(resultList.getSize() > 0) {
            Map<String, Object> success = new HashMap<>();
            result.put("maxPage", resultList.getTotalPages());
            result.put("list", resultList.getContent());
            return result;
        } else {
            return null;
        }
    }

    @Override
    public Map<String, Object> getCustomFlowerDetails(String flowerId, Principal principal) {
        CustomFlowerEntity basicInfo = customFlowerRepository.findByDesignIdAndRemoval(flowerId, false);
        CustomFlowerDocument detailInfo = customFlowerMongoRepository.findById(flowerId).orElse(null);

        if(basicInfo == null || detailInfo == null) return null;

        Map<String, Object> result = new HashMap<>();
        result.put("basics", basicInfo);
        result.put("details", detailInfo);

        return result;
    }

    @Override
    public Map<String, Object> removeCustomFlower(String flowerId, Principal principal) {
        return null;
    }
}
