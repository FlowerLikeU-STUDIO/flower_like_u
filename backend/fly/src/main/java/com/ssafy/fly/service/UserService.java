package com.ssafy.fly.service;

import com.ssafy.fly.dto.request.*;

import java.util.Map;

public interface UserService {
    public boolean checkIdDuplication(String inputId);
    public Map<String, Object> saveMember(RegisterReq registerReq);
    public Map<String, Object> findID(FindIdReq findIdReq);
    public Map<String, Object> issueTemporaryPassword(FindPwdReq findPwdReq);
    public boolean checkNicknameDuplication(String inputNickname);
    public Map<String, Object> updateUserInfo(ChangeInfoReq changeInfoReq);
    public Map<String, Object> updateIntroduction(ChangeIntroductionReq changeIntroductionReq);
    public Map<String, Object> updatePassword(ChangePwdReq changePwdReq);
    public Map<String, Object> updateProfileImage(ChangeProfileReq changeProfileReq);
    public Map<String, Object> deleteUser(WithdrawReq withdrawReq);
    public Map<String, Object> findUserInfo(String userId);
}
