package com.ssafy.fly.controller;

import com.ssafy.fly.common.util.ResultMessageSet;
import com.ssafy.fly.dto.request.*;
import com.ssafy.fly.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
public class UserController {

    private final AccountService accountService;
    private final ResultMessageSet resultMessageSet;

    @Autowired
    public UserController(ResultMessageSet resultMessageSet,
                          AccountService accountService) {
        this.resultMessageSet = resultMessageSet;
        this.accountService = accountService;
    }

    // 1. 아이디 중복 검사
    @GetMapping("/chkId/{inputId}")
    public ResponseEntity<Map<String, Object>> checkDuplicatedID(@PathVariable String inputId) {
        System.out.println("[POST] - /account/chkId" + inputId);

        Map<String, Object> response = new HashMap<>();

        if (accountService.checkIdDuplication(inputId)) {
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

        if (accountService.saveMember(registerReq)) {
            response.put("result", resultMessageSet.SUCCESS);
        } else {
            response.put("result", resultMessageSet.FAIL);
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 3. 아이디 찾기
    @PostMapping("/findId")
    public ResponseEntity<Map<String, Object>> findID(@RequestBody FindIdReq findIdReq) {
        System.out.println("[POST] - /user/findId " + findIdReq);

        Map<String, Object> response = new HashMap<>();
        String userId = accountService.findID(findIdReq);

        if (userId != null) {
            response.put("result", resultMessageSet.SUCCESS);
            response.put("userId", userId);
        } else {
            response.put("result", resultMessageSet.FAIL);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 4. 비밀번호 찾기(임시 비밀번호 발급)
    @PostMapping("/findPassword")
    public ResponseEntity<Map<String, Object>> findPassword(@RequestBody FindPwdReq findPwdReq) {
        System.out.println("[POST] - /user/findPassword " + findPwdReq);

        Map<String, Object> response = new HashMap<>();

        if (accountService.issueTemporaryPassword(findPwdReq)) {
            response.put("result", resultMessageSet.SUCCESS);
        } else {
            response.put("result", resultMessageSet.FAIL);
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 5. 닉네임 중복 검사
    @GetMapping("/chkNickname/{nickname}")
    public ResponseEntity<Map<String, Object>> checkDuplicatedNickname(@PathVariable String nickname) {
        System.out.println("[GET] - /user/chkNickname " + nickname);

        Map<String, Object> response = new HashMap<>();

        if (accountService.checkNicknameDuplication(nickname)) {
            response.put("result", resultMessageSet.DUPLICATED);
        } else {
            response.put("result", resultMessageSet.NONDUPLICATED);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 6. 회원 정보 수정
    @PutMapping("/")
    public ResponseEntity<Map<String, Object>> changeInfo(@RequestBody ChangeInfoReq changeInfoReq) {
        System.out.println("[PUT] - /user " + changeInfoReq);

        Map<String, Object> response = new HashMap<>();

        if (accountService.updateAccountInfo(changeInfoReq)) {
            response.put("result", resultMessageSet.SUCCESS);
        } else {
            response.put("result", resultMessageSet.FAIL);
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 7. 소개글 수정(판매자)
    @PutMapping("/introduction")
    public ResponseEntity<Map<String, Object>> changeStoreIntroduction(@RequestBody ChangeIntroductionReq changeIntroductionReq) {
        System.out.println("[PUT] - /user/introduction " + changeIntroductionReq);

        Map<String, Object> response = new HashMap<>();

        if (accountService.updateIntroduction(changeIntroductionReq)) {
            response.put("result", resultMessageSet.SUCCESS);
        } else {
            response.put("result", resultMessageSet.FAIL);
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 8. 비밀번호 변경
    @PutMapping("/changePassword")
    public ResponseEntity<Map<String, Object>> changePassword(@RequestBody ChangePwdReq changePwdReq) {
        System.out.println("[PUT] - /user/changePassword " + changePwdReq);

        Map<String, Object> response = new HashMap<>();

        if (accountService.updatePassword(changePwdReq)) {
            response.put("result", resultMessageSet.SUCCESS);
        } else {
            response.put("result", resultMessageSet.FAIL);
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 9. 프로필 이미지 변경
    @PutMapping("/changeImg")
    public ResponseEntity<Map<String, Object>> updateMemberProfileImage(@RequestBody ChangeProfileReq changeProfileReq) {
        System.out.println("[PUT] - /user/changeImg " + changeProfileReq);

        Map<String, Object> response = new HashMap<>();

        if (accountService.updateProfileImage(changeProfileReq)) {
            response.put("result", resultMessageSet.SUCCESS);
        } else {
            response.put("message", resultMessageSet.FAIL);
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 10. 회원 탈퇴
    @DeleteMapping()
    public ResponseEntity<Map<String, Object>> withdrawFromMember(@RequestBody WithdrawReq withdrawReq) {
        System.out.println("[DELETE] - /user " + withdrawReq);

        Map<String, Object> response = new HashMap<>();

        if (accountService.deleteAccount(withdrawReq)) {
            response.put("result", resultMessageSet.SUCCESS);
        } else {
            response.put("result", resultMessageSet.FAIL);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 11. 회원 정보 조회
    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> getAccountInfo(@PathVariable String userId) {
        System.out.println("[GET] - /member/{userId}");

        Map<String, Object> response = new HashMap<>();

        Object accountInfo = accountService.findAccountInfo(userId);

        if (accountInfo != null) {
            response.put("result", resultMessageSet.SUCCESS);
            response.put("userInfo", accountInfo);
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