package com.ssafy.fly.service;

import com.ssafy.fly.database.mongodb.document.CustomFlowerDocument;
import com.ssafy.fly.database.mongodb.repository.CustomFlowerMongoRepository;
import com.ssafy.fly.database.mysql.entity.*;
import com.ssafy.fly.database.mysql.repository.*;
import com.ssafy.fly.dto.request.CustomFlowerRegReq;
import com.ssafy.fly.dto.response.CustomDetailRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import javax.transaction.Transactional;
import java.security.Principal;
import java.util.*;

@Service("customFlowerService")
@Transactional
public class CustomFlowerServiceImpl implements CustomFlowerService {

    private final ConsumerRepository consumerRepository;
    private final CustomFlowerRepository customFlowerRepository;
    private final CustomFlowerMongoRepository customFlowerMongoRepository;

    private final FlowerRepository flowerRepository;
    private final WrapperRepository wrapperRepository;
    private final RibbonRepository ribbonRepository;

    @Autowired
    public CustomFlowerServiceImpl(ConsumerRepository consumerRepository,
                                   CustomFlowerRepository customFlowerRepository,
                                   CustomFlowerMongoRepository customFlowerMongoRepository,
                                   FlowerRepository flowerRepository,
                                   WrapperRepository wrapperRepository,
                                   RibbonRepository ribbonRepository) {
        this.consumerRepository = consumerRepository;
        this.customFlowerRepository = customFlowerRepository;
        this.customFlowerMongoRepository = customFlowerMongoRepository;
        this.flowerRepository = flowerRepository;
        this.wrapperRepository = wrapperRepository;
        this.ribbonRepository = ribbonRepository;
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

        String korType = "";
        String wrapperName = null;
        String ribbonName = null;
        if ("bouquet".equals(customFlowerRegReq.getType())) {
            if (customFlowerRegReq.getWrapperId() == null || customFlowerRegReq.getRibbonId() == null) {
                message = "꽃다발 선택 시 포장지와 리본 아이디는 필수 입력값입니다.";
                result.put("result", false);
                result.put("message", message);
                return result;
            }

            WrapperAsset wrapper = wrapperRepository.findById(customFlowerRegReq.getWrapperId()).orElse(null);
            if (wrapper == null) {
                message = "잘못된 포장지 에셋의 아이디입니다.";
                result.put("result", false);
                result.put("message", message);
                return result;
            }

            RibbonAsset ribbon = ribbonRepository.findById(customFlowerRegReq.getRibbonId()).orElse(null);
            if (ribbon == null) {
                message = "잘못된 리본 에셋의 아이디입니다.";
                result.put("result", false);
                result.put("message", message);
                return result;
            }

            korType = "꽃다발";
            wrapperName = wrapper.getName();
            ribbonName = ribbon.getName();
        } else if ("vase".equals(customFlowerRegReq.getType())) {
            if (customFlowerRegReq.getWrapperId() != null || customFlowerRegReq.getRibbonId() != null) {
                message = "꽃병 선택 시 포장지와 리본의 아이디는 입력할 수 없습니다.";
                result.put("result", false);
                result.put("message", message);
                return result;
            }

            korType = "꽃병";
        } else if ("balloon".equals(customFlowerRegReq.getType())) {
            if (customFlowerRegReq.getWrapperId() == null) {
                message = "꽃풍선 선택 시 포장지 아이디는 필수 입력값입니다.";
                result.put("result", false);
                result.put("message", message);
                return result;
            } else if (customFlowerRegReq.getRibbonId() != null) {
                message = "꽃풍선 선택 시 리본의 아이디는 입력할 수 없습니다.";
                result.put("result", false);
                result.put("message", message);
                return result;
            }

            WrapperAsset wrapper = wrapperRepository.findById(customFlowerRegReq.getWrapperId()).orElse(null);
            if (wrapper == null) {
                message = "잘못된 포장지 에셋의 아이디입니다.";
                result.put("result", false);
                result.put("message", message);
                return result;
            }

            korType = "꽃풍선";
            wrapperName = wrapper.getName();
        } else {
            message = "존재하지 않는 타입입니다.";
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        int flowerNum = customFlowerRegReq.getFlowers().size();
        List<String> flowerList = new ArrayList<>();
        for (int i = 0; i < flowerNum; i++) {
            FlowerAsset flower = flowerRepository.findById(customFlowerRegReq.getFlowers().get(i)).orElse(null);
            if (flower == null) {
                message = "잘못된 꽃 에셋의 아이디입니다.";
                result.put("result", false);
                result.put("message", message);
                return result;
            }

            flowerList.add(flower.getTitle());
        }

        CustomFlowerDocument customizeInfo = CustomFlowerDocument.builder()
                .type(korType)
                .wrapper(wrapperName)
                .ribbon(ribbonName)
                .size(customFlowerRegReq.getSize())
                .flowers(flowerList)
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
        if (consumer == null) {
            message = "잘못된 토큰 정보입니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        Pageable pageable = PageRequest.of((pageNo > 0 ? pageNo - 1 : 0), size, Sort.by("id").descending());
        Page<CustomFlowerEntity> resultList = customFlowerRepository.findAllByConsumerId(consumer, pageable);

        if (resultList.getContent().size() > 0) {
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
        if (!basicInfo.getConsumerId().getUserId().equals(principal.getName())) {
            message = "잘못된 토큰 정보입니다.";
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        CustomFlowerDocument customInfo = customFlowerMongoRepository.findById(flowerId).orElse(null);
        if (basicInfo == null || customInfo == null) {
            message = "존재하지 않는 커스텀 꽃다발 아이디(String Type) 입니다.";
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        CustomDetailRes detailInfo = CustomDetailRes.builder()
                .type(customInfo.getType())
                .wrapper(customInfo.getWrapper())
                .ribbon(customInfo.getRibbon())
                .size(customInfo.getSize())
                .flowers(customInfo.cntFlowerNumber())
                .build();
        
        result.put("result", true);
        result.put("basics", basicInfo);
        result.put("details", detailInfo);

        return result;
    }

    // 4. 커스텀 꽃다발 정보 삭제
    @Override
    public Map<String, Object> removeCustomFlower(String flowerId, Principal principal) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        CustomFlowerEntity customFlower = customFlowerRepository.findByDesignIdAndRemoval(flowerId, false);
        if (customFlower == null) {
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

        if (!customFlower.getConsumerId().getUserId().equals(principal.getName())) {
            message = "삭제 권한이 없는 계정입니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        if (customFlowerRepository.CustomFlowerRemove(flowerId) > 0) {
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
