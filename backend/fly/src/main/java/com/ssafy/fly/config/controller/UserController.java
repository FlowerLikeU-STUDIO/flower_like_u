package com.ssafy.fly.config.controller;

import com.ssafy.fly.common.util.ResultMessageSet;
import com.ssafy.fly.dto.request.*;
import com.ssafy.fly.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final ResultMessageSet resultMessageSet;

    @Autowired
    public UserController(ResultMessageSet resultMessageSet,
                          UserService userService) {
        this.resultMessageSet = resultMessageSet;
        this.userService = userService;
    }

    // 1. 아이디 중복 검사
    @GetMapping("/chkId/{inputId}")
    public ResponseEntity<Map<String, Object>> checkDuplicatedID(@PathVariable String inputId) {
        System.out.println("[POST] - /user/chkId" + inputId);

        Map<String, Object> response = new HashMap<>();

        if (userService.checkIdDuplication(inputId)) {
            response.put("result", resultMessageSet.DUPLICATED);
        } else {
            response.put("result", resultMessageSet.NONDUPLICATED);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 2. 회원 정보 등록
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerMember(@RequestBody RegisterReq registerReq) {
        System.out.println("[POST] - /user/register " + registerReq);

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

    // 3. 아이디 찾기
    @PostMapping("/findId")
    public ResponseEntity<Map<String, Object>> findID(@RequestBody FindIdReq findIdReq) {
        System.out.println("[POST] - /user/findId " + findIdReq);

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

    // 4. 비밀번호 찾기(임시 비밀번호 발급)
    @PostMapping("/findPassword")
    public ResponseEntity<Map<String, Object>> findPassword(@RequestBody FindPwdReq findPwdReq) {
        System.out.println("[POST] - /user/findPassword " + findPwdReq);

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

    // 5. 닉네임 중복 검사
    @GetMapping("/chkNickname/{nickname}")
    public ResponseEntity<Map<String, Object>> checkDuplicatedNickname(@PathVariable String nickname) {
        System.out.println("[GET] - /user/chkNickname " + nickname);

        Map<String, Object> response = new HashMap<>();

        if (userService.checkNicknameDuplication(nickname)) {
            response.put("result", resultMessageSet.DUPLICATED);
        } else {
            response.put("result", resultMessageSet.NONDUPLICATED);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 6. 회원 정보 수정
    @PutMapping()
    public ResponseEntity<Map<String, Object>> changeInfo(@RequestBody ChangeInfoReq changeInfoReq,
                                                          Principal principal) {
        System.out.println("[PUT] - /user " + changeInfoReq);

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

    // 7. 소개글 수정(판매자)
    @PutMapping("/introduction")
    public ResponseEntity<Map<String, Object>> changeStoreIntroduction(@RequestBody Map<String, Object> changeIntroductionReq,
                                                                       Principal principal) {
        System.out.println("[PUT] - /user/introduction " + changeIntroductionReq);

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

    // 8. 비밀번호 변경
    @PutMapping("/changePassword")
    public ResponseEntity<Map<String, Object>> changePassword(@RequestBody ChangePwdReq changePwdReq,
                                                              Principal principal) {
        System.out.println("[PUT] - /user/changePassword " + changePwdReq);

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

    // 9. 프로필 이미지 변경
    @PutMapping("/changeImg")
    public ResponseEntity<Map<String, Object>> updateMemberProfileImage(@RequestBody Map<String, Object> changeProfileReq,
                                                                        Principal principal) {
        System.out.println("[PUT] - /user/changeImg " + changeProfileReq);

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

    // 10. 회원 탈퇴
    @DeleteMapping()
    public ResponseEntity<Map<String, Object>> withdrawFromMember(@RequestBody Map<String, Object> withdrawReq,
                                                                  Principal principal) {
        System.out.println("[DELETE] - /user " + withdrawReq);

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

    // 11. 회원 정보 조회
    @GetMapping()
    public ResponseEntity<Map<String, Object>> getUserInfo(Principal principal) {
        System.out.println("[GET] - /member");

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> result = userService.findUserInfo(principal);

        if ((boolean) result.get("result")) {
            response.put("result", resultMessageSet.SUCCESS);
            response.put("userInfo", result.get("userInfo"));
        } else {
            response.put("result", resultMessageSet.FAIL);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // JWT 적용 후 사용자 본인 프로필 조회
//    @GetMapping()
//    public ResponseEntity<Map<String, Object>> getAccountInfo(HttpServletRequest request) {
//        System.out.println("GET TEST");
//        System.out.println(request.getHeader("Authorization"));
//        Map<String, Object> result = new HashMap<>();
//
//        return new ResponseEntity<>(result, HttpStatus.OK);
//    }
}
