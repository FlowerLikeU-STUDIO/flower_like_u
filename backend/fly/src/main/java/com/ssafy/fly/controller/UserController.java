package com.ssafy.fly.controller;

import com.ssafy.fly.common.util.RegionMap;
import com.ssafy.fly.common.util.ResultMessageSet;
import com.ssafy.fly.common.vo.RegionVo;
import com.ssafy.fly.dto.request.*;
import com.ssafy.fly.dto.response.RegionWrprRes;
import com.ssafy.fly.service.UserService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
public class UserController {

    private final Logger logger = LogManager.getLogger(UserController.class);

    private final UserService userService;
    private final ResultMessageSet resultMessageSet;

    @Autowired
    public UserController(ResultMessageSet resultMessageSet,
                          UserService userService) {
        this.resultMessageSet = resultMessageSet;
        this.userService = userService;
    }

    /** 1. 아이디 중복 검사 */
    @GetMapping("/chkId/{inputId}")
    public ResponseEntity<Map<String, Object>> checkDuplicatedID(@PathVariable String inputId) {
        logger.info("[POST] - /user/chkId " + inputId);

        Map<String, Object> response = new HashMap<>();

        if (userService.checkIdDuplication(inputId)) {
            response.put("result", resultMessageSet.DUPLICATED);
        } else {
            response.put("result", resultMessageSet.NONDUPLICATED);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /** 2. 회원 정보 등록 */
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerMember(@RequestBody RegisterReq registerReq) {
        logger.info("[POST] - /user/register " + registerReq);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = userService.saveMember(registerReq);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /** 3. 아이디 찾기 */
    @PostMapping("/findId")
    public ResponseEntity<Map<String, Object>> findID(@RequestBody FindIdReq findIdReq) {
        logger.info("[POST] - /user/findId " + findIdReq);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = userService.findID(findIdReq);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
            response.put("userId", result.get("userId"));
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /** 4. 비밀번호 찾기(임시 비밀번호 발급) */
    @PostMapping("/findPassword")
    public ResponseEntity<Map<String, Object>> findPassword(@RequestBody FindPwdReq findPwdReq) {
        logger.info("[POST] - /user/findPassword " + findPwdReq);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = userService.issueTemporaryPassword(findPwdReq);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /** 5. 닉네임 중복 검사 */
    @GetMapping("/chkNickname/{nickname}")
    public ResponseEntity<Map<String, Object>> checkDuplicatedNickname(@PathVariable String nickname) {
        logger.info("[GET] - /user/chkNickname " + nickname);

        Map<String, Object> response = new HashMap<>();

        if (userService.checkNicknameDuplication(nickname)) {
            response.put("result", resultMessageSet.DUPLICATED);
        } else {
            response.put("result", resultMessageSet.NONDUPLICATED);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /** 6. 회원 정보 수정 */
    @PutMapping()
    public ResponseEntity<Map<String, Object>> changeInfo(@RequestBody ChangeInfoReq changeInfoReq,
                                                          Principal principal) {
        logger.info("[PUT] - /user " + changeInfoReq);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = userService.updateUserInfo(changeInfoReq, principal);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /** 7. 소개글 수정(판매자) */
    @PutMapping("/introduction")
    public ResponseEntity<Map<String, Object>> changeStoreIntroduction(@RequestBody Map<String, Object> changeIntroductionReq,
                                                                       Principal principal) {
        logger.info("[PUT] - /user/introduction " + changeIntroductionReq);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = userService.updateIntroduction(changeIntroductionReq.get("introduction").toString(), principal);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /** 8. 비밀번호 변경 */
    @PutMapping("/changePassword")
    public ResponseEntity<Map<String, Object>> changePassword(@RequestBody ChangePwdReq changePwdReq,
                                                              Principal principal) {
        logger.info("[PUT] - /user/changePassword " + changePwdReq);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = userService.updatePassword(changePwdReq, principal);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /** 9. 프로필 이미지 변경 */
    @PutMapping("/changeImg")
    public ResponseEntity<Map<String, Object>> updateMemberProfileImage(@RequestBody Map<String, Object> changeProfileReq,
                                                                        Principal principal) {
        logger.info("[PUT] - /user/changeImg " + changeProfileReq);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = userService.updateProfileImage(changeProfileReq.get("image").toString(), principal);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /** 10. 회원 탈퇴 */
    @DeleteMapping()
    public ResponseEntity<Map<String, Object>> withdrawFromMember(@RequestBody Map<String, Object> withdrawReq,
                                                                  Principal principal) {
        logger.info("[DELETE] - /user " + withdrawReq);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = userService.deleteUser(withdrawReq.get("password").toString(), principal);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /** 11. 회원 정보 조회 */
    @GetMapping()
    public ResponseEntity<Map<String, Object>> getUserInfo(Principal principal) {
        logger.info("[GET] - /user");

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = userService.findUserInfo(principal);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
            response.put("userInfo", result.get("userInfo"));
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("result", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /** 12. 꽃가게 프로필 정보 조회 */
    @GetMapping("/store/{storeId}")
    public ResponseEntity<Map<String, Object>> getStoreInfo(@PathVariable Long storeId) {
        logger.info("[GET] - /user/store " + storeId);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = userService.findStoreInfo(storeId);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
            response.put("storeInfo", result.get("storeInfo"));
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /** 13. 판매자 목록 조회 */
    @GetMapping("/stores")
    public ResponseEntity<Map<String, Object>> getStoreList(@RequestParam(value = "page", required = false, defaultValue = "0") int pageNo,
                                                            @RequestParam(value = "size", required = false, defaultValue = "8") int size,
                                                            @RequestParam(value = "sort", required = false, defaultValue = "reg") String sort,
                                                            @RequestParam(value = "sd", required = false, defaultValue = "전체") String sido,
                                                            @RequestParam(value = "sgg", required = false, defaultValue = "전체") String sigungu,
                                                            @RequestParam(value = "sn", required = false, defaultValue = "") String storeName) {
        logger.info("[GET] - /user/store ");
        logger.info(String.format("[Page=%d] [Size=%d] [Sort=%s] [SI-DO=%s] [SI-GUN-GU=%s] [STORENAME=%s]", pageNo, size, sort, sido, sigungu, storeName));

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = userService.findStoreList(pageNo, size, sort, sido, sigungu, storeName);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
            response.put("storeInfo", result.get("info"));
        } else {
            response.put("result", resultMessageSet.FAIL);
            response.put("message", result.get("message"));
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /* 판매자 목록 조회 지도용 */

    @GetMapping("/stores/region")
    public ResponseEntity<Map<String,Object>> getListMap(@RequestParam(value = "sd", required = false, defaultValue = "전체") String region1, @RequestParam(value = "sgg", required = false, defaultValue = "전체") String region2) {
        Map<String,Object> response = new HashMap<>();
        List<RegionVo> regionVoList = userService.findStoreList(region1,region2);
        double avgLongitude;
        double avgLatitude;
        /*if (regionVoList.size() == 0) {
            if ("전체".equals(region2)) {
                //for (Object o :RegionMap.ofMap().keySet()) System.out.println(o.toString());
                System.out.println("wow");
                System.out.println(RegionMap.ofMap().get(region1).toString());
                System.out.println("wow");
                avgLatitude = (Double)RegionMap.ofMap().get(region1)[0];
                avgLongitude = (Double)RegionMap.ofMap().get(region1)[1];
            } else {
                avgLatitude = (Double)RegionMap.ofMap().get(region1 + " " + region2)[0];
                avgLongitude = (Double)RegionMap.ofMap().get(region1 + " " + region2)[1];
            }*/
        avgLongitude = regionVoList.stream().mapToDouble(RegionVo::getLongitude).sum() / regionVoList.size();
        avgLatitude = regionVoList.stream().mapToDouble(RegionVo::getLatitude).sum() / regionVoList.size();
        RegionWrprRes<RegionVo> regionWrprRes = new RegionWrprRes<>();
        regionWrprRes.setResponseList(regionVoList);
        regionWrprRes.setAvgLongitude(avgLongitude);
        regionWrprRes.setAvgLatitude(avgLatitude);
        response.put("result",resultMessageSet.SUCCESS);
        response.put("regionList", regionWrprRes);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
