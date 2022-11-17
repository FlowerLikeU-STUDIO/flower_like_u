package com.ssafy.fly.controller;

import com.ssafy.fly.common.util.CustomMap;
import com.ssafy.fly.common.util.FlowerMap;
import com.ssafy.fly.common.util.ResultMessageSet;
import com.ssafy.fly.common.vo.FlowerVo;
import com.ssafy.fly.dto.request.CustomFlowerRegReq;
import com.ssafy.fly.service.CustomFlowerService;
import com.ssafy.fly.service.HarmonyFlowerService;
import com.ssafy.fly.service.HarmonyService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;

//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/custom")
public class CustomController {

    //private final Logger logger = LogManager.getLogger(CustomController.class);

    private final CustomFlowerService customFlowerService;
    private final ResultMessageSet resultMessageSet;
    private final HarmonyService harmonyService;
    private final HarmonyFlowerService harmonyFlowerService;

    @Autowired
    public CustomController(CustomFlowerService customFlowerService,
                            ResultMessageSet resultMessageSet,
                            HarmonyService harmonyService,
                            HarmonyFlowerService harmonyFlowerService) {
        this.customFlowerService = customFlowerService;
        this.resultMessageSet = resultMessageSet;
        this.harmonyService = harmonyService;
        this.harmonyFlowerService = harmonyFlowerService;
    }


    /** 1. 커스텀 꽃다발 정보 등록 */
    @PostMapping()
    public ResponseEntity<Map<String, Object>> registFlower(@RequestBody CustomFlowerRegReq customFlowerRegReq,
                                                            Authentication authentication) {
        //logger.info("[POST] - /custom - {}", customFlowerRegReq);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = customFlowerService.saveCustomFlower(customFlowerRegReq, authentication);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
            List<String> colorLst = customFlowerRegReq.getFlowers().stream().map(flower -> {
                return FlowerMap.idxToColor[flower.intValue()];
            }).collect(Collectors.toList());
            harmonyFlowerService.create(colorLst);
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /** 2. 커스텀 꽃다발 목록 조회 */
    @GetMapping()
    public ResponseEntity<Map<String, Object>> getCustomFlowerList(@RequestParam(value = "page", required = false, defaultValue = "0") int pageNo,
                                                                   @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                                   Authentication authentication) {
        //logger.info("[GET] /custom?page={}&size={}", pageNo, size);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = customFlowerService.getCustomFlowerList(pageNo, size, authentication);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
            response.put("designList", result.get("list"));
            response.put("maxPage", result.get("maxPage"));
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /** 3. 커스텀 꽃다발 상세 정보 조회 */
    @GetMapping("/detail/{flowerId}")
    public ResponseEntity<Map<String, Object>> getCumstomFlowerDetailInfo(@PathVariable String flowerId,
                                                                          Authentication authentication) {
        //logger.info("[GET] /custom/detail/{flowerId} - {}", flowerId);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = customFlowerService.getCustomFlowerDetails(flowerId, authentication);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
            response.put("flowerInfo", result);
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /** 4. 커스텀 꽃다발 정보 삭제 */
    @DeleteMapping("/{flowerId}")
    public ResponseEntity<Map<String, Object>> removeCumstomFlowerInfo(@PathVariable String flowerId,
                                                                       Authentication authentication) {
        //logger.info("[DELETE] /custom/{flowerId} - {}", flowerId);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = customFlowerService.removeCustomFlower(flowerId, authentication);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /** 5. 커스텀 꽃다발 조합 추천 */
    @GetMapping("/recommend/{size}")
    public ResponseEntity<List<FlowerVo>> getRecommend(@PathVariable int size) {
        //logger.info("[GET] /custom/recommend/{size} - {}", size);

        Map<String, FlowerVo[]> flowerMap = FlowerMap.ofMap();
        if (size == 0) {
            int idx = (int) Math.floor(Math.random() * 7);
            FlowerVo[] flowerVos = flowerMap.get(harmonyService.getColor(CustomMap.color[idx]));
            int idxTmp = (int) Math.floor(Math.random() * flowerVos.length);
            FlowerVo flowerVo = flowerVos[idxTmp];
            List<FlowerVo> flowerVoLst = new ArrayList<>();
            flowerVoLst.add(flowerVo);
            return new ResponseEntity<>(flowerVoLst, HttpStatus.OK);
        }
        String[] arr = new String[size];
        Map<Integer, List<Integer>> map = CustomMap.ofMap(size);
        Queue<Integer> queue = new LinkedList<>();

        while (true) {
            List<Integer> isNull = new ArrayList<>();
            for (int i = 0; i < size; i++)
                if (arr[i] == null) isNull.add(i);

            if (isNull.size() == 0) break;
            int idx = (int) Math.floor(Math.random() * 7);
            int position = (int) Math.floor(Math.random() * isNull.size());
            arr[isNull.get(position)] = CustomMap.color[idx];
            queue.add(position);
            while (queue.size() > 0) {
                int node = queue.poll();
                if (arr[node] == null) break;
                while (true) {
                    List<Integer> filterLst = map.get(node).stream().filter((x) -> {
                        return arr[x] == null;
                    }).collect(Collectors.toList());
                    if (filterLst.size() == 0) break;
                    int nextIdx = (int) Math.floor(Math.random() * filterLst.size());
                    if (arr[filterLst.get(nextIdx)] == null) {
                        arr[filterLst.get(nextIdx)] = harmonyService.getColor(arr[node]);
                        queue.add(filterLst.get(nextIdx));
                        break;
                    }
                }
            }
        }

        List<FlowerVo> flowerVoList = Arrays.stream(arr).map(color -> {
            int idxTmp = (int) Math.floor(Math.random() * flowerMap.get(color).length);
            return flowerMap.get(color)[idxTmp];
        }).collect(Collectors.toList());
        return new ResponseEntity<>(flowerVoList, HttpStatus.OK);
    }
}
