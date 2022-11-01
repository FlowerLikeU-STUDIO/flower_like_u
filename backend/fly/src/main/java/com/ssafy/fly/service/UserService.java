package com.ssafy.fly.service;

import com.ssafy.fly.dto.request.*;

public interface UserService {
    public boolean checkIdDuplication(String inputId);
    public boolean saveMember(RegisterReq registerReq);
    public String findID(FindIdReq findIdReq);
    public boolean issueTemporaryPassword(FindPwdReq findPwdReq);
    public boolean checkNicknameDuplication(String inputNickname);
    public boolean updateUserInfo(ChangeInfoReq changeInfoReq);
    public boolean updateIntroduction(ChangeIntroductionReq changeIntroductionReq);
    public boolean updatePassword(ChangePwdReq changePwdReq);
    public boolean updateProfileImage(ChangeProfileReq changeProfileReq);
    public boolean deleteUser(WithdrawReq withdrawReq);
    public Object findUserInfo(String userId);
}
