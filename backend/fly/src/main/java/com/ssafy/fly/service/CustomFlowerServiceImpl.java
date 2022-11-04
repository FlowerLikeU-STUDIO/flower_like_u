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
    public boolean saveCustomFlower(CustomFlowerRegReq customFlowerRegReq) {
        String userId = customFlowerRegReq.getUserId();
        ConsumerEntity consumer = consumerRepository.findByUserIdAndWithdrawal(userId, false);

        if (consumer == null) return false;

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

        boolean result;
        if (designId != null) {
            CustomFlowerEntity customFlower = CustomFlowerEntity.builder()
                    .consumerId(consumer)
                    .designId(designId)
                    .image(customFlowerRegReq.getImage())
                    .removal(false)
                    .build();
            customFlowerRepository.save(customFlower);
            result = true;
        } else {
            result = false;
        }

        return result;
    }

    @Override
    public Map<String, Object> getCustomFlowerList(String userId, Pageable pageable, int pageNo) {
        ConsumerEntity consumer = consumerRepository.findByUserIdAndWithdrawal(userId, false);
        if(consumer == null) return null;

        pageable = PageRequest.of(pageNo, FEED_PAEG_SIZE);
        Page<CustomFlowerEntity> resultList = customFlowerRepository.findAllByConsumerId(consumer, pageable);

        if(resultList.getSize() > 0) {
            Map<String, Object> result = new HashMap<>();
            result.put("maxPage", resultList.getTotalPages());
            result.put("list", resultList.getContent());
            return result;
        } else {
            return null;
        }
    }

    @Override
    public Map<String, Object> getCustomFlowerDetails(String flowerId) {
        CustomFlowerEntity basicInfo = customFlowerRepository.findByDesignIdAndRemoval(flowerId, false);
        CustomFlowerDocument detailInfo = customFlowerMongoRepository.findById(flowerId).orElse(null);

        if(basicInfo == null || detailInfo == null) return null;

        Map<String, Object> result = new HashMap<>();
        result.put("basics", basicInfo);
        result.put("details", detailInfo);

        return result;
    }
}
