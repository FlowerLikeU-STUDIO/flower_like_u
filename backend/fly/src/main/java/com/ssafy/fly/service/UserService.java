package com.ssafy.fly.service;

import com.ssafy.fly.common.vo.RegionVo;
import com.ssafy.fly.common.vo.KakaoUserInfo;
import com.ssafy.fly.dto.request.*;
import org.springframework.security.core.Authentication;

import java.security.Principal;
import java.util.List;
import java.util.Map;

public interface UserService {
    public boolean checkIdDuplication(String inputId);
    public Map<String, Object> saveMember(RegisterReq registerReq);
    public Map<String, Object> findID(FindIdReq findIdReq);
    public Map<String, Object> issueTemporaryPassword(FindPwdReq findPwdReq);
    public boolean checkNicknameDuplication(String inputNickname);
    public Map<String, Object> updateUserInfo(ChangeInfoReq changeInfoReq, Authentication authentication);
    public Map<String, Object> updateIntroduction(String introduction, Authentication authentication);
    public Map<String, Object> updatePassword(ChangePwdReq changePwdReq, Authentication authentication);
    public Map<String, Object> updateProfileImage(String image, Authentication authentication);
    public Map<String, Object> deleteUser(String password, Authentication authentication);
    public Map<String, Object> findUserInfo(Authentication authentication);
    public Map<String, Object> findStoreInfo(Long storeId);
    public Map<String, Object> findStoreList(int pageNo, int size, String sort, String sido, String sigungu, String storeName);
    public List<RegionVo> findStoreList(String region1, String region2);
    public void saveKakaoMember(KakaoUserInfo kakaoUserInfo);
}
