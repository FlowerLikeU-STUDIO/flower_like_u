package com.ssafy.fly.service;

import com.ssafy.fly.common.util.DecimalFormatter;
import com.ssafy.fly.common.util.FlyMailSender;
import com.ssafy.fly.common.util.RandomNicknameMaker;
import com.ssafy.fly.common.util.RandomStringGenerator;
import com.ssafy.fly.common.util.ValidationChecker;
import com.ssafy.fly.common.vo.RegionVo;
import com.ssafy.fly.database.mysql.entity.ConsumerEntity;
import com.ssafy.fly.database.mysql.entity.RegionEntity;
import com.ssafy.fly.database.mysql.entity.StoreEntity;
import com.ssafy.fly.database.mysql.enumtype.UserType;
import com.ssafy.fly.database.mysql.repository.*;
import com.ssafy.fly.dto.request.*;
import com.ssafy.fly.dto.response.MailRes;
import com.ssafy.fly.dto.response.StoreInfoRes;
import com.ssafy.fly.dto.response.UserInfoRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {

    private final ConsumerRepository consumerRepository;
    private final StoreRepository storeRepository;
    private final FeedRepository feedRepository;
    private final RegionRepository regionRepository;
    private final ValidationChecker validationChecker;
    private final RandomStringGenerator randomStringGenerator;
    private final FlyMailSender flyMailSender;
    private final PasswordEncoder passwordEncoder;
    private final DecimalFormatter decimalFormatter;

    @Autowired
    public UserServiceImpl(ConsumerRepository consumerRepository,
                           StoreRepository storeRepository,
                           FeedRepository feedRepository,
                           RegionRepository regionRepository,
                           ValidationChecker validationChecker,
                           RandomStringGenerator randomStringGenerator,
                           FlyMailSender flyMailSender,
                           PasswordEncoder passwordEncoder,
                           DecimalFormatter decimalFormatter) {
        this.consumerRepository = consumerRepository;
        this.storeRepository = storeRepository;
        this.feedRepository = feedRepository;
        this.regionRepository = regionRepository;
        this.validationChecker = validationChecker;
        this.randomStringGenerator = randomStringGenerator;
        this.flyMailSender = flyMailSender;
        this.passwordEncoder = passwordEncoder;
        this.decimalFormatter = decimalFormatter;
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
    public Map<String, Object> saveMember(RegisterReq registerReq) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        // 비밀번호 재확인
        if (!registerReq.getPassword().equals(registerReq.getPassword2())) {
            message = "서로 다른 비밀번호를 입력하였습니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        // 아이디 유효성 검사(알파벳 + 숫자 조합 8자 이상 16자 이하)
        if (!validationChecker.idValidationCheck(registerReq.getUserId())) {
            message = "올바른 아이디 형식이 아닙니다. 알파벳 + 숫자 조합 8~16자를 입력해주세요.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        // 비밀번호 유효성 검사(알파벳 + 숫자 + 특수문자 조합 8자 이상 16자 이하)
        if (!validationChecker.pwdValidationCheck(registerReq.getPassword())) {
            message = "올바른 비밀번호 형식이 아닙니다. 알파벳 + 숫자 + 특수문자 조합 8~16자를 입력해주세요.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        ConsumerEntity consumer = consumerRepository.findFirstByUserId(registerReq.getUserId());
        StoreEntity store = storeRepository.findFirstByUserId(registerReq.getUserId());
        if (consumer != null || store != null) {
            message = "이미 사용 중인 아이디입니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        // 구매자(consumer) 회원 정보 등록
        if ("consumer".equals(registerReq.getType())) {
            ConsumerEntity newMember = ConsumerEntity.builder()
                    .type(UserType.CONSUMER)
                    .userId(registerReq.getUserId())
                    .password(passwordEncoder.encode(registerReq.getPassword()))
                    .name(registerReq.getName())
                    .nickname(RandomNicknameMaker.getNickname())
                    .email(registerReq.getEmail())
                    .regDate(new Date())
                    .withdrawal(false)
                    .build();
            consumerRepository.save(newMember);
        }

        // 판매자(store) 회원 정보 등록
        else if ("store".equals(registerReq.getType())) {
            // 사업자등록번호(license) 유효성 검사
            if (!validationChecker.storeLicenseValidationCheck(registerReq.getLicense())) {
                message = "올바른 사업자 등록번호 형식이 아닙니다. 00-000-000000 형태로 입력해주세요";
                System.out.println(message);
                result.put("result", false);
                result.put("message", message);
                return result;
            }

            StoreEntity newMember = StoreEntity.builder()
                    .type(UserType.STORE)
                    .userId(registerReq.getUserId())
                    .password(passwordEncoder.encode(registerReq.getPassword()))
                    .name(registerReq.getName())
                    .store(registerReq.getStore())
                    .license(registerReq.getLicense())
                    .email(registerReq.getEmail())
                    .zipCode(registerReq.getAddress().getZipCode())
                    .street(registerReq.getAddress().getStreet())
                    .detailAddr(registerReq.getAddress().getDetails())
                    .sigunguCode(registerReq.getAddress().getSigunguCode())
                    .regDate(new Date())
                    .withdrawal(false)
                    .latitude(registerReq.getAddress().getLatitude())
                    .longitude(registerReq.getAddress().getLongitude())
                    .build();
            storeRepository.save(newMember);
        }
        result.put("result", true);
        return result;
    }

    // 3. 아이디 찾기
    @Override
    public Map<String, Object> findID(FindIdReq findIdReq) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        String inputName = findIdReq.getName();
        String inputEmail = findIdReq.getEmail();

        // 구매자와 판매자 테이블에서 (이름, 이메일, 미탈퇴자)로 탐색
        ConsumerEntity consumer = consumerRepository.findByNameAndEmailAndWithdrawal(inputName, inputEmail, false);
        StoreEntity store = storeRepository.findByNameAndEmailAndWithdrawal(inputName, inputEmail, false);

        // 결과 반환
        if (consumer == null && store == null) {
            message = "입력과 일치하는 회원의 정보가 없습니다.";
            result.put("result", false);
            result.put("message", message);
            return result;
        } else {
            if (consumer != null) {
                result.put("userId", consumer.getUserId());
            } else {
                result.put("userId", store.getUserId());
            }
            result.put("result", true);
            return result;
        }
    }

    // 4. 임시 비밀번호 발급
    @Override
    public Map<String, Object> issueTemporaryPassword(FindPwdReq findPwdReq) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        String inputUserId = findPwdReq.getUserId();
        String inputName = findPwdReq.getName();
        String inputEmail = findPwdReq.getEmail();

        // 구매자와 판매자 테이블에서 (아이디, 이름, 이메일, 미탈퇴자)로 탐색
        ConsumerEntity consumer = consumerRepository.findByUserIdAndNameAndEmailAndWithdrawal(inputUserId, inputName, inputEmail, false);
        StoreEntity store = storeRepository.findByUserIdAndNameAndEmailAndWithdrawal(inputUserId, inputName, inputEmail, false);

        if (consumer == null && store == null) {
            message = "입력과 일치하는 회원의 정보가 없습니다.";
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        // 임시 비밀번호 생성
        String tempPassword = randomStringGenerator.generateRandomPassword(10);
        System.out.printf("TEMPORARY PASSWORD: %s\n", tempPassword);

        // Database에서 비밀번호 업데이트
        int success = -1;
        if (consumer != null) {
            success = consumerRepository.updatePassword(inputUserId, passwordEncoder.encode(tempPassword));
        } else {
            success = storeRepository.updatePassword(inputUserId, passwordEncoder.encode(tempPassword));
        }

        // 임시 비밀번호 변경 성공 시 사용자 메일로 발송
        if (success > 0) {
            String content = String.format("임시 비밀번호는 [%s] 입니다.\n" +
                    "보안을 위해 로그인 후 비밀번호 변경 바랍니다.", tempPassword);
            MailRes mailForm = MailRes.builder()
                    .address(inputEmail)
                    .title("[너닮꽃] 임시 비밀번호 발송")
                    .message(content)
                    .build();
            flyMailSender.sendEmail(mailForm);
            result.put("result", true);
        } else {
            message = "서버 문제로 요청 작업을 완료하지 못하였습니다.";
            result.put("result", false);
            result.put("message", message);
        }
        return result;
    }

    // 5. 닉네임 중복 검사
    @Override
    public boolean checkNicknameDuplication(String inputNickname) {
        return consumerRepository.findByNickname(inputNickname) != null;
    }

    // 6. 회원 정보 수정
    @Override
    @Transactional
    public Map<String, Object> updateUserInfo(ChangeInfoReq changeInfoReq, Principal principal) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        String userId = principal.getName();

        // 구매자와 판매자 테이블에서 (아이디, 비밀번호, 미탈퇴자)로 탐색
        ConsumerEntity consumer = consumerRepository.findByUserIdAndWithdrawal(userId, false);
        StoreEntity store = storeRepository.findByUserIdAndWithdrawal(userId, false);

        if (consumer == null && store == null) {
            message = "입력과 일치하는 회원의 정보가 없습니다.";
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        if (consumer != null) {
            String nickname = changeInfoReq.getNickname();
            String zipCode = changeInfoReq.getAddress().getZipCode();
            String street = changeInfoReq.getAddress().getStreet();
            String details = changeInfoReq.getAddress().getDetails();
            String sigunguCode = changeInfoReq.getAddress().getSigunguCode();
            if (consumerRepository.updateConsumerInfo(userId, nickname, zipCode, street, details, sigunguCode) > 0) {
                result.put("result", true);
            } else {
                message = "서버 문제로 요청 작업을 완료하지 못하였습니다.";
                result.put("result", false);
                result.put("message", message);
            }
        } else if (store != null) {
            store.setStore(changeInfoReq.getStore());
            store.setZipCode(changeInfoReq.getAddress().getZipCode());
            store.setStreet(changeInfoReq.getAddress().getStreet());
            store.setDetailAddr(changeInfoReq.getAddress().getDetails());
            store.setSigunguCode(changeInfoReq.getAddress().getSigunguCode());
            store.setHolidays(changeInfoReq.getHolidays().toString().replaceAll("[\\[\\]\\ ]", ""));
            store.setLatitude(changeInfoReq.getAddress().getLatitude());
            store.setLongitude(changeInfoReq.getAddress().getLongitude());
            storeRepository.save(store);
            if (true) {
                result.put("result", true);
            } else {
                message = "서버 문제로 요청 작업을 완료하지 못하였습니다.";
                result.put("result", false);
                result.put("message", message);
            }
        } else {
            message = "수정 권한이 없는 계정입니다.";
            result.put("result", false);
            result.put("message", message);
        }

        return result;
    }

    // 7. 소개글 수정(판매자)
    @Override
    public Map<String, Object> updateIntroduction(String introduction, Principal principal) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        StoreEntity store = storeRepository.findByUserIdAndWithdrawal(principal.getName(), false);
        if (store == null) {
            message = "잘못된 토큰 정보입니다.";
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        if (storeRepository.updateIntroduction(principal.getName(), introduction) > 0) {
            result.put("result", true);
        } else {
            message = "서버 문제로 요청 작업을 완료하지 못하였습니다.";
            result.put("result", false);
            result.put("message", message);
        }

        return result;
    }

    // 8. 비밀번호 변경
    @Override
    public Map<String, Object> updatePassword(ChangePwdReq changePwdReq, Principal principal) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        String userId = principal.getName();
        String curPwd = changePwdReq.getCurPwd();
        String newPwd = changePwdReq.getNewPwd();
        String newPwd2 = changePwdReq.getNewPwd2();

        if (!newPwd.equals(newPwd2)) {
            message = "서로 다른 비밀번호를 입력하였습니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        if (!validationChecker.pwdValidationCheck(newPwd)) {
            message = "올바른 비밀번호 형식이 아닙니다. 알파벳 + 숫자 + 특수문자 조합 8~16자를 입력해주세요.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        // 구매자와 판매자 테이블에서 (아이디, 비밀번호, 미탈퇴자)로 탐색
        ConsumerEntity consumer = consumerRepository.findByUserIdAndWithdrawal(userId, false);
        StoreEntity store = storeRepository.findByUserIdAndWithdrawal(userId, false);

        if (consumer == null && store == null) {
            message = "잘못된 토큰 정보입니다.";
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        // Database에서 비밀번호 업데이트
        int success;
        if (consumer != null && passwordEncoder.matches(curPwd, consumer.getPassword())) {
            success = consumerRepository.updatePassword(userId, passwordEncoder.encode(newPwd));
        } else if (store != null && passwordEncoder.matches(curPwd, store.getPassword())) {
            success = storeRepository.updatePassword(userId, passwordEncoder.encode(newPwd));
        } else {
            success = -1;
        }

        // 틀린 비밀번호에 대한 에러 메시지가 없음
        if (success > 0) {
            result.put("result", true);
        } else {
            message = "서버 문제로 요청 작업을 완료하지 못하였습니다.";
            result.put("result", false);
            result.put("message", message);
        }

        return result;
    }

    // 9. 프로필 이미지 변경
    @Override
    public Map<String, Object> updateProfileImage(String image, Principal principal) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        String userId = principal.getName();

        ConsumerEntity consumer = consumerRepository.findByUserIdAndWithdrawal(userId, false);
        StoreEntity store = storeRepository.findByUserIdAndWithdrawal(userId, false);

        if (consumer == null && store == null) {
            message = "잘못된 토큰 정보입니다.";
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        // Database에서 프로필 이미지 업데이트
        int success;
        if (consumer != null && consumerRepository.updateProfileImage(userId, image) > 0) {
            result.put("result", true);
        } else if (store != null && storeRepository.updateProfileImage(userId, image) > 0) {
            result.put("result", true);
        } else {
            message = "서버 문제로 요청 작업을 완료하지 못하였습니다.";
            result.put("result", false);
            result.put("message", message);
        }

        return result;
    }

    // 10. 회원 탈퇴
    @Override
    public Map<String, Object> deleteUser(String password, Principal principal) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        String userId = principal.getName();

        ConsumerEntity consumer = consumerRepository.findByUserIdAndWithdrawal(userId, false);
        StoreEntity store = storeRepository.findByUserIdAndWithdrawal(userId, false);

        if (consumer == null && store == null) {
            message = "잘못된 토큰 정보입니다.";
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        // Database에서 탈퇴 속성 업데이트
        int success = -1;
        if (consumer != null && passwordEncoder.matches(password, consumer.getPassword())) {
            success = consumerRepository.accountWithdraw(userId);
        } else if (store != null && passwordEncoder.matches(password, store.getPassword())) {
            success = storeRepository.accountWithdraw(userId);
        } else {
            success = -2;
        }

        if (success > 0) {
            result.put("result", true);
        } else {
            if (success == -1) {
                message = "서버 문제로 요청 작업을 완료하지 못하였습니다.";
            } else if (success == -2) {
                message = "비밀번호가 일치하지 않습니다.";
            }
            result.put("result", false);
            result.put("message", message);
        }

        return result;
    }

    // 11. 회원 정보 조회
    @Override
    public Map<String, Object> findUserInfo(Principal principal) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        ConsumerEntity consumer = consumerRepository.findByUserIdAndWithdrawal(principal.getName(), false);
        StoreEntity store = storeRepository.findByUserIdAndWithdrawal(principal.getName(), false);

        if (consumer == null && store == null) {
            message = "잘못된 토큰 정보입니다.";
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        if (consumer != null) {
            UserInfoRes.ForConsumer userInfo = UserInfoRes.ForConsumer.builder()
                    .type(consumer.getType().toString().toLowerCase())
                    .userPk(consumer.getId())
                    .userId(consumer.getUserId())
                    .name(consumer.getName())
                    .nickname(consumer.getNickname())
                    .email(consumer.getEmail())
                    .profile(consumer.getProfile())
                    .address(UserInfoRes.Address.builder()
                            .zipCode(consumer.getZipCode())
                            .street(consumer.getStreet())
                            .details(consumer.getDetailAddr())
                            .sigunguCode(consumer.getSigunguCode())
                            .build())
                    .build();
            result.put("result", true);
            result.put("userInfo", userInfo);
        } else if (store != null) {
            List<Boolean> holidays = new ArrayList<>();
            if (store.getHolidays() != null) {
                StringTokenizer st = new StringTokenizer(store.getHolidays(), ",");
                while (st.hasMoreTokens()) {
                    String weekday = st.nextToken();
                    if ("true".equals(weekday)) holidays.add(true);
                    else holidays.add(false);
                }
            }

            UserInfoRes.ForStore userInfo = UserInfoRes.ForStore.builder()
                    .type(store.getType().toString().toLowerCase())
                    .userPk(store.getId())
                    .userId(store.getUserId())
                    .name(store.getName())
                    .email(store.getEmail())
                    .storeName(store.getStore())
                    .license(store.getLicense())
                    .profile(store.getProfile())
                    .holidays(holidays)
                    .feedNum(store.getTotalFeed())
                    .rating(decimalFormatter.roundToTwoDecimalPlaces(store.getRating()))
                    .introduction(store.getBio())
                    .address(UserInfoRes.Address.builder()
                            .zipCode(store.getZipCode())
                            .street(store.getStreet())
                            .details(store.getDetailAddr())
                            .sigunguCode(store.getSigunguCode())
                            .build())
                    .build();
            result.put("result", true);
            result.put("userInfo", userInfo);
        } else {
            message = "서버 문제로 요청 작업을 완료하지 못하였습니다.";
            result.put("result", false);
            result.put("message", message);
        }
        return result;
    }

    // 12. 꽃가게 프로필 정보 조회
    @Override
    public Map<String, Object> findStoreInfo(Long storeId) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        StoreEntity store = storeRepository.findByIdAndWithdrawal(storeId, false);
        if (store == null) {
            message = "존재하지 않는 판매자 아이디(Long Type) 입니다.";
            System.out.println(message);
            result.put("message", message);
            result.put("result", false);
            return result;
        }

        StoreInfoRes.ForDetails storeInfo = StoreInfoRes.ForDetails.builder()
                .name(store.getName())
                .email(store.getEmail())
                .storeName(store.getStore())
                .address(String.format("%s %s", store.getStreet(), store.getDetailAddr()))
                .profile(store.getProfile())
                .feedNum(store.getTotalFeed())
                .introduction(store.getBio())
                .rating(decimalFormatter.roundToTwoDecimalPlaces(store.getRating()))
                .build();

        result.put("result", true);
        result.put("storeInfo", storeInfo);

        return result;
    }

    // 13. 판매자 목록 조회
    @Override
    public Map<String, Object> findStoreList(int pageNo, int size, String sort, String sido, String sigungu, String storeName) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        String sortKey = "";
        if("reg".equals(sort)) sortKey = "id";
        else if("order".equals(sort)) sortKey = "totalOrder";
        else if("rating".equals(sort)) sortKey = "rating";
        else {
            message = "입력 가능한 정렬 기준이 아닙니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        Pageable pageable = PageRequest.of((pageNo > 0 ? pageNo - 1 : 0), size, Sort.by(sortKey).descending());

        Page<StoreEntity> searchList = null;
        if("전체".equals(sido) && "전체".equals(sigungu)) {
            searchList = storeRepository.findAllByStoreContainsAndWithdrawal(storeName, false, pageable);
        } else if(!"전체".equals(sido) && "전체".equals(sigungu)) {
            String sidoCode = regionRepository.findAllBySido(sido).get(0).getSidoCode();
            searchList = storeRepository.findAllByStoreContainsAndWithdrawalAndSigunguCodeStartsWith(storeName, false, sidoCode, pageable);
        } else if(!"전체".equals(sido) && !"전체".equals(sigungu)) {
            RegionEntity searchRegion = regionRepository.findBySidoAndSigungu(sido, sigungu);
            String fullCode = searchRegion.getSidoCode() + searchRegion.getSigunguCode();
            searchList = storeRepository.findAllByStoreContainsAndWithdrawalAndSigunguCodeEquals(storeName, false, fullCode, pageable);
        } else {
            message = "잘못된 파라미터 입력입니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        Map<String, Object> info = new HashMap<>();

        if(!searchList.isEmpty()) {
            List<StoreInfoRes.ForList> resultList = new ArrayList<>();
            for(StoreEntity curEntity : searchList) {
                StoreInfoRes.ForList storeInfo = StoreInfoRes.ForList.builder()
                        .storeId(curEntity.getId())
                        .storeName(curEntity.getStore())
                        .profile(curEntity.getProfile())
                        .rating(decimalFormatter.roundToTwoDecimalPlaces(curEntity.getRating() == null ? 0 : curEntity.getRating()))
                        .address(String.format("%s %s", curEntity.getStreet(), curEntity.getDetailAddr()).trim())
                        .latitude(curEntity.getLatitude())
                        .longitude(curEntity.getLongitude())
                        .build();
                resultList.add(storeInfo);
            }
            info.put("maxPage", searchList.getTotalPages());
            info.put("list", resultList);
            result.put("result", true);
            result.put("info", info);
        } else {
            message = "존재하지 않는 페이지입니다.";
            result.put("result", false);
            result.put("message", message);
        }

        return result;
    }

    public List<RegionVo> findStoreList(String region1, String region2) {
        return storeRepository.findAll().stream().filter(store -> {
            String[] s = store.getStreet().split(" ");
            if (region1.equals("전체") && region2.equals("전체")) return true;
            else if (region2.equals("전체")) return s[0].equals(region1);
            return s[0].equals(region1) && s[1].equals(region2);
        }).map(store -> {
            return new RegionVo(store.getStreet(),
                    store.getName(), store.getLatitude(), store.getLongitude(),
                    store.getStore(),store.getBio(), store.getProfile(), store.getRating(), store.getHolidays());
        }).collect(Collectors.toList());
    }
}
