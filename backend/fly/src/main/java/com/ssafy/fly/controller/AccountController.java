package com.ssafy.fly.controller;

import com.ssafy.fly.dto.request.*;
import com.ssafy.fly.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/account")
public class AccountController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private static final String DUPLICATED = "duplicated";
    private static final String NONDUPLICATED = "nonDuplicated";

    private static final int OK = 200;
    private static final int CREATED = 201;
    private static final int NO_CONTENT = 204;
    private static final int ERROR = 500;

    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    // 1. 아이디 중복 검사
    @GetMapping("/chkid/{inputId}")
    public ResponseEntity<Map<String, Object>> checkDuplicatedID(@PathVariable String inputId) {
        System.out.println("[POST] - /account/chkid" + inputId);

        Map<String, Object> result = new HashMap<>();
        Map<String, Object> response = new HashMap<>();

        if (accountService.checkIdDuplication(inputId)) {
            response.put("message", DUPLICATED);
            result.put("statusCode", OK);
        } else {
            response.put("message", NONDUPLICATED);
            result.put("statusCode", OK);
        }
        result.put("response", response);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 2. 회원 정보 등록
    @PostMapping()
    public ResponseEntity<Map<String, Object>> registerMember(@RequestBody RegisterReq registerReq) {
        System.out.println("[POST] - /account " + registerReq);

        Map<String, Object> result = new HashMap<>();
        Map<String, Object> response = new HashMap<>();

        if (accountService.saveMember(registerReq)) {
            response.put("message", SUCCESS);
            result.put("statusCode", CREATED);
        } else {
            response.put("message", FAIL);
            result.put("statusCode", ERROR);
        }
        result.put("response", response);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    // 3. 아이디 찾기
    @PostMapping("/id")
    public ResponseEntity<Map<String, Object>> findID(@RequestBody FindIdReq findIdReq) {
        System.out.println("[POST] - /account/findid " + findIdReq);

        Map<String, Object> result = new HashMap<>();
        Map<String, Object> response = new HashMap<>();

        String userId = accountService.findID(findIdReq);

        if (userId != null) {
            response.put("userId", userId);
            response.put("message", SUCCESS);
            result.put("statusCode", OK);
        } else {
            response.put("message", FAIL);
            result.put("statusCode", ERROR);
        }

        result.put("response", response);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 4. 비밀번호 찾기(임시 비밀번호 발급)
    @PostMapping("/password")
    public ResponseEntity<Map<String, Object>> findPassword(@RequestBody FindPwdReq findPwdReq) {
        System.out.println("[POST] - /account/findpwd " + findPwdReq);

        Map<String, Object> result = new HashMap<>();
        Map<String, Object> response = new HashMap<>();

        if (accountService.issueTemporaryPassword(findPwdReq)) {
            response.put("message", SUCCESS);
            result.put("statusCode", CREATED);
        } else {
            response.put("message", FAIL);
            result.put("statusCode", CREATED);
        }

        result.put("response", response);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    // 5. 닉네임 중복 검사
    @GetMapping("/chknic/{nickname}")
    public ResponseEntity<Map<String, Object>> checkDuplicatedNickname(@PathVariable String nickname) {
        System.out.println("[POST] - /account/chknic " + nickname);

        Map<String, Object> result = new HashMap<>();
        Map<String, Object> response = new HashMap<>();

        if (accountService.checkNicknameDuplication(nickname)) {
            response.put("message", DUPLICATED);
            result.put("statusCode", OK);
        } else {
            response.put("message", NONDUPLICATED);
            result.put("statusCode", OK);
        }

        result.put("response", response);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 6. 회원 정보 수정
    @PutMapping("/")
    public ResponseEntity<Map<String, Object>> changeInfo(@RequestBody ChangeInfoReq changeInfoReq) {
        System.out.println("[PUT] - /account " + changeInfoReq);

        Map<String, Object> result = new HashMap<>();
        Map<String, Object> response = new HashMap<>();

        if (accountService.updateAccountInfo(changeInfoReq)) {
            response.put("message", SUCCESS);
            result.put("statusCode", CREATED);
        } else {
            response.put("message", FAIL);
            result.put("statusCode", CREATED);
        }

        result.put("response", response);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    // 7. 소개글 수정(판매자)
    @PutMapping("/introduction")
    public ResponseEntity<Map<String, Object>> changeStoreIntroduction(@RequestBody ChangeIntroductionReq changeIntroductionReq) {
        System.out.println("[PUT] - /account/introduction " + changeIntroductionReq);

        Map<String, Object> result = new HashMap<>();
        Map<String, Object> response = new HashMap<>();

        if (accountService.updateIntroduction(changeIntroductionReq)) {
            response.put("message", SUCCESS);
            result.put("statusCode", CREATED);
        } else {
            response.put("message", FAIL);
            result.put("statusCode", CREATED);
        }

        result.put("response", response);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    // 8. 비밀번호 변경
    @PutMapping("/password")
    public ResponseEntity<Map<String, Object>> changePassword(@RequestBody ChangePwdReq changePwdReq) {
        System.out.println("[PUT] - /account/password " + changePwdReq);

        Map<String, Object> result = new HashMap<>();
        Map<String, Object> response = new HashMap<>();

        if (accountService.updatePassword(changePwdReq)) {
            response.put("message", SUCCESS);
            result.put("statusCode", CREATED);
        } else {
            response.put("message", FAIL);
            result.put("statusCode", CREATED);
        }

        result.put("response", response);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    // 9. 프로필 이미지 변경
    @PutMapping("/changeimg")
    public ResponseEntity<Map<String, Object>> updateMemberProfileImage(@RequestBody ChangeProfileReq changeProfileReq) {
        System.out.println("[PUT] - /account/changeimg " + changeProfileReq);

        Map<String, Object> result = new HashMap<>();
        Map<String, Object> response = new HashMap<>();

        if (accountService.updateProfileImage(changeProfileReq)) {
            response.put("message", SUCCESS);
            result.put("statusCode", CREATED);
        } else {
            response.put("message", FAIL);
            result.put("statusCode", CREATED);
        }

        result.put("response", response);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    // 10. 회원 탈퇴
    @DeleteMapping()
    public ResponseEntity<Map<String, Object>> withdrawFromMember(@RequestBody WithdrawReq withdrawReq) {
        System.out.println("[DELETE] - /account " + withdrawReq);

        Map<String, Object> result = new HashMap<>();
        Map<String, Object> response = new HashMap<>();

        if (accountService.deleteAccount(withdrawReq)) {
            response.put("message", SUCCESS);
            result.put("statusCode", CREATED);
        } else {
            response.put("message", FAIL);
            result.put("statusCode", CREATED);
        }

        result.put("response", response);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 11. 회원 정보 조회
    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> getAccountInfo(@PathVariable String userId) {
        System.out.println("[GET] - /member/{userId}");

        Map<String, Object> result = new HashMap<>();

        Object accountInfo = accountService.findAccountInfo(userId);

        if (accountInfo != null) {
            result.put("statusCode", OK);
            result.put("response", accountInfo);
        } else {
            Map<String, Object> response = new HashMap<>();
            result.put("statusCode", ERROR);
            response.put("message", FAIL);
            result.put("response", response);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
