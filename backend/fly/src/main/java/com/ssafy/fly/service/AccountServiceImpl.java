package com.ssafy.fly.service;

import com.ssafy.fly.common.util.FlyMailSender;
import com.ssafy.fly.common.util.RandomStringGenerator;
import com.ssafy.fly.common.util.ValidationChecker;
import com.ssafy.fly.database.mysql.entity.ConsumerEntity;
import com.ssafy.fly.database.mysql.entity.StoreEntity;
import com.ssafy.fly.database.mysql.enumtype.UserType;
import com.ssafy.fly.database.mysql.repository.ConsumerRepository;
import com.ssafy.fly.database.mysql.repository.StoreRepository;
import com.ssafy.fly.dto.request.*;
import com.ssafy.fly.dto.response.ConsumerInfoRes;
import com.ssafy.fly.dto.response.MailRes;
import com.ssafy.fly.dto.response.StoreInfoRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;

@Service("accountService")
@Transactional
public class AccountServiceImpl implements AccountService {

    private final ConsumerRepository consumerRepository;
    private final StoreRepository storeRepository;
    private final ValidationChecker validationChecker;
    private final RandomStringGenerator randomStringGenerator;
    private final FlyMailSender flyMailSender;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AccountServiceImpl(ConsumerRepository consumerRepository,
                              StoreRepository storeRepository,
                              ValidationChecker validationChecker,
                              RandomStringGenerator randomStringGenerator,
                              FlyMailSender flyMailSender,
                              PasswordEncoder passwordEncoder) {
        this.consumerRepository = consumerRepository;
        this.storeRepository = storeRepository;
        this.validationChecker = validationChecker;
        this.randomStringGenerator = randomStringGenerator;
        this.flyMailSender = flyMailSender;
        this.passwordEncoder = passwordEncoder;
    }

    // 1. 아이디 중복 검사
    @Override
    public boolean checkIdDuplication(String inputId) {
        boolean hasConsumer = consumerRepository.findFirstByUserId(inputId) != null;
        boolean hasStore = storeRepository.findFirstByUserId(inputId) != null;

        return hasConsumer || hasStore;
    }

    // 2. 회원 정보 등록
    @Override
    public boolean saveMember(RegisterReq registerReq) {

        // 비밀번호 재확인
        if (!registerReq.getPassword().equals(registerReq.getPassword2())) {
            System.out.println("서로 다른 비밀번호 입력");
            return false;
        }

        // 아이디 유효성 검사(알파벳 + 숫자 조합 8자 이상 16자 이하)
        if (!validationChecker.idValidationCheck(registerReq.getUserId())) {
            System.out.println("아이디 유효성 검증 실패");
            return false;
        }

        // 비밀번호 유효성 검사(알파벳 + 숫자 + 특수문자 조합 8자 이상 16자 이하)
        if (!validationChecker.pwdValidationCheck(registerReq.getPassword())) {
            System.out.println("비밀번호 유효성 검증 실패");
            return false;
        }

        // 구매자(consumer) 회원 정보 등록
        if ("consumer".equals(registerReq.getType())) {
            ConsumerEntity newMember = ConsumerEntity.builder()
                    .type(UserType.CONSUMER)
                    .userId(registerReq.getUserId())
                    .password(passwordEncoder.encode(registerReq.getPassword()))
                    .name(registerReq.getName())
                    .nickname("랜덤닉네임")
                    .email(registerReq.getEmail())
                    .regDate(new Date())
                    .withdrawal(false)
                    .build();
            consumerRepository.save(newMember);
        }

        // 판매자(store) 회원 정보 등록
        else if ("store".equals(registerReq.getType())) {
            // 사업자등록번호(license) 유효성 검사
            if (!validationChecker.storeLicenseValidationCheck(registerReq.getLicense())) return false;

            StoreEntity newMember = StoreEntity.builder()
                    .type(UserType.STORE)
                    .userId(registerReq.getUserId())
                    .password(passwordEncoder.encode(registerReq.getPassword()))
                    .name(registerReq.getName())
                    .store(registerReq.getStore())
                    .license(registerReq.getLicense())
                    .email(registerReq.getEmail())
                    .address(registerReq.getAddress())
                    .regDate(new Date())
                    .withdrawal(false)
                    .build();
            storeRepository.save(newMember);
        }
        return true;
    }

    // 3. 아이디 찾기
    @Override
    public String findID(FindIdReq findIdReq) {
        String inputName = findIdReq.getName();
        String inputEmail = findIdReq.getEmail();

        // 구매자와 판매자 테이블에서 (이름, 이메일, 미탈퇴자)로 탐색
        ConsumerEntity consumer = consumerRepository.findByNameAndEmailAndWithdrawal(inputName, inputEmail, false);
        StoreEntity store = storeRepository.findByNameAndEmailAndWithdrawal(inputName, inputEmail, false);

        // 결과 반환
        if (consumer == null && store == null) {
            return null;
        } else {
            if (consumer != null) {
                return consumer.getUserId();
            } else {
                return store.getUserId();
            }
        }
    }

    // 4. 임시 비밀번호 발급
    @Override
    public boolean issueTemporaryPassword(FindPwdReq findPwdReq) {
        String inputUserId = findPwdReq.getUserId();
        String inputName = findPwdReq.getName();
        String inputEmail = findPwdReq.getEmail();

        // 구매자와 판매자 테이블에서 (아이디, 이름, 이메일, 미탈퇴자)로 탐색
        ConsumerEntity consumer = consumerRepository.findByUserIdAndNameAndEmailAndWithdrawal(inputUserId, inputName, inputEmail, false);
        StoreEntity store = storeRepository.findByUserIdAndNameAndEmailAndWithdrawal(inputUserId, inputName, inputEmail, false);

        if (consumer == null && store == null) return false;

        // 임시 비밀번호 생성
        String tempPassword = randomStringGenerator.generateRandomPassword(10);
        System.out.printf("TEMPORARY PASSWORD: %s\n", tempPassword);

        // Database에서 비밀번호 업데이트
        int result;
        if (consumer != null) {
            result = consumerRepository.updatePassword(inputUserId, passwordEncoder.encode(tempPassword));
        } else {
            result = storeRepository.updatePassword(inputUserId, passwordEncoder.encode(tempPassword));
        }

        // 임시 비밀번호 변경 성공 시 사용자 메일로 발송
        if (result > 0) {
            String message = String.format("임시 비밀번호는 [%s] 입니다.\n" +
                    "보안을 위해 로그인 후 비밀번호 변경 바랍니다.", tempPassword);
            MailRes mailForm = MailRes.builder()
                    .address(inputEmail)
                    .title("[너닮꽃] 임시 비밀번호 발송")
                    .message(message)
                    .build();
            flyMailSender.sendEmail(mailForm);
            return true;
        } else {
            return false;
        }
    }

    // 5. 닉네임 중복 검사
    @Override
    public boolean checkNicknameDuplication(String inputNickname) {
        return consumerRepository.findByNickname(inputNickname) != null;
    }

    // 6. 회원 정보 수정
    @Override
    public boolean updateAccountInfo(ChangeInfoReq changeInfoReq) {
        String userId = changeInfoReq.getUserId();

        // 구매자와 판매자 테이블에서 (아이디, 비밀번호, 미탈퇴자)로 탐색
        ConsumerEntity consumer = consumerRepository.findByUserIdAndWithdrawal(userId, false);
        StoreEntity store = storeRepository.findByUserIdAndWithdrawal(userId, false);

        if (consumer == null && store == null) return false;

        int result;
        if (consumer != null) {
            String nickname = changeInfoReq.getNickname();
            String address = changeInfoReq.getAddress();
            result = consumerRepository.updateConsumerInfo(userId, nickname, address);
        } else if(store != null) {
            String storeName = changeInfoReq.getStore();
            String address = changeInfoReq.getAddress();
            // String holidays = changeInfoReq;
            result = storeRepository.updateStoreInfo(userId, storeName, address);
        } else {
            result = -1;
        }

        return result > 0;
    }

    // 7. 소개글 수정(판매자)
    @Override
    public boolean updateIntroduction(ChangeIntroductionReq changeIntroductionReq) {
        String userId = changeIntroductionReq.getUserId();
        String introduction = changeIntroductionReq.getIntroduction();

        return storeRepository.updateIntroduction(userId, introduction) > 0;
    }

    // 8. 비밀번호 변경
    @Override
    public boolean updatePassword(ChangePwdReq changePwdReq) {
        String userId = changePwdReq.getUserId();
        String curPwd = changePwdReq.getCurPwd();
        String newPwd = changePwdReq.getNewPwd();
        String newPwd2 = changePwdReq.getNewPwd2();

        if (!newPwd.equals(newPwd2)) return false;

        if (!validationChecker.pwdValidationCheck(newPwd)) return false;

        // 구매자와 판매자 테이블에서 (아이디, 비밀번호, 미탈퇴자)로 탐색
        ConsumerEntity consumer = consumerRepository.findByUserIdAndWithdrawal(userId, false);
        StoreEntity store = storeRepository.findByUserIdAndWithdrawal(userId, false);

        if (consumer == null && store == null) return false;

        // Database에서 비밀번호 업데이트
        int result;
        if (consumer != null && passwordEncoder.matches(curPwd, consumer.getPassword())) {
            result = consumerRepository.updatePassword(userId, passwordEncoder.encode(newPwd));
        } else if(store != null && passwordEncoder.matches(curPwd, store.getPassword())) {
            result = storeRepository.updatePassword(userId, passwordEncoder.encode(newPwd));
        } else {
            result = -1;
        }

        return result > 0;
    }

    // 9. 프로필 이미지 변경
    @Override
    public boolean updateProfileImage(ChangeProfileReq changeProfileReq) {
        String userId = changeProfileReq.getUserId();
        String image = changeProfileReq.getImage();

        ConsumerEntity consumer = consumerRepository.findByUserIdAndWithdrawal(userId, false);
        StoreEntity store = storeRepository.findByUserIdAndWithdrawal(userId, false);

        if (consumer == null && store == null) return false;

        // Database에서 프로필 이미지 업데이트
        int result;
        if (consumer != null) {
            result = consumerRepository.updateProfileImage(userId, image);
        } else {
            result = storeRepository.updateProfileImage(userId, image);
        }

        return result > 0;
    }

    // 10. 회원 탈퇴
    @Override
    public boolean deleteAccount(WithdrawReq withdrawReq) {
        String userId = withdrawReq.getUserId();
        String password = withdrawReq.getPassword();

        ConsumerEntity consumer = consumerRepository.findByUserIdAndWithdrawal(userId, false);
        StoreEntity store = storeRepository.findByUserIdAndWithdrawal(userId, false);

        if (consumer == null && store == null) return false;

        // Database에서 탈퇴 속성 업데이트
        int result;
        if (consumer != null && passwordEncoder.matches(password, consumer.getPassword())) {
            result = consumerRepository.accountWithdraw(userId);
        } else if (store != null && passwordEncoder.matches(password, store.getPassword())){
            result = storeRepository.accountWithdraw(userId);
        } else {
            result = -1;
        }

        return result > 0;
    }

    // 11. 회원 정보 조회
    @Override
    public Object findAccountInfo(String userId) {
        ConsumerEntity consumer = consumerRepository.findByUserIdAndWithdrawal(userId, false);
        StoreEntity store = storeRepository.findByUserIdAndWithdrawal(userId, false);

        if (consumer == null && store == null) return null;

        if (consumer != null) {
            return ConsumerInfoRes.builder()
                    .type(consumer.getType().toString().toLowerCase())
                    .userId(consumer.getUserId())
                    .name(consumer.getName())
                    .nickname(consumer.getNickname())
                    .email(consumer.getEmail())
                    .address(consumer.getAddress())
                    .profile(consumer.getProfile())
                    .regDate(consumer.getRegDate())
                    .build();
        } else if (store != null) {
            return StoreInfoRes.builder()
                    .type(store.getType().toString().toLowerCase())
                    .userId(store.getUserId())
                    .name(store.getName())
                    .email(store.getEmail())
                    .storeName(store.getStore())
                    .license(store.getLicense())
                    .address(store.getAddress())
                    .profile(store.getProfile())
                    .feedNum(0)
                    .introduction(store.getBio())
                    .rating(4.35)
                    .regDate(store.getRegDate())
                    .build();
        } else {
            return null;
        }
    }
}
