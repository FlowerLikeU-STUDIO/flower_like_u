package com.ssafy.fly.service;

import com.ssafy.fly.dto.request.*;

import java.security.Principal;
import java.util.Map;

public interface UserService {
    public boolean checkIdDuplication(String inputId);
    public Map<String, Object> saveMember(RegisterReq registerReq);
    public Map<String, Object> findID(FindIdReq findIdReq);
    public Map<String, Object> issueTemporaryPassword(FindPwdReq findPwdReq);
    public boolean checkNicknameDuplication(String inputNickname);
    public Map<String, Object> updateUserInfo(ChangeInfoReq changeInfoReq, Principal principal);
    public Map<String, Object> updateIntroduction(String introduction, Principal principal);
    public Map<String, Object> updatePassword(ChangePwdReq changePwdReq, Principal principal);
    public Map<String, Object> updateProfileImage(String image, Principal principal);
    public Map<String, Object> deleteUser(String password, Principal principal);
    public Map<String, Object> findUserInfo(Principal principal);
    public Map<String, Object> findStoreInfo(Long storeId);
    public Map<String, Object> findStoreList(int pageNo, int size, String sido, String sigungu, String storeName);
}
