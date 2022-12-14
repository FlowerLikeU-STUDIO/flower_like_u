package com.ssafy.fly.service;

import com.ssafy.fly.common.exception.CustomException;
import com.ssafy.fly.common.util.*;
import com.ssafy.fly.common.vo.RegionVo;
import com.ssafy.fly.common.vo.KakaoUserInfo;
import com.ssafy.fly.database.mysql.entity.ConsumerEntity;
import com.ssafy.fly.database.mysql.entity.RegionEntity;
import com.ssafy.fly.database.mysql.entity.StoreEntity;
import com.ssafy.fly.database.mysql.enumtype.UserType;
import com.ssafy.fly.database.mysql.repository.*;
import com.ssafy.fly.dto.request.*;
import com.ssafy.fly.dto.response.MailRes;
import com.ssafy.fly.dto.response.StoreInfoRes;
import com.ssafy.fly.dto.response.UserInfoRes;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {

    private final Logger logger = LogManager.getLogger(UserServiceImpl.class);

    private final ConsumerRepository consumerRepository;
    private final StoreRepository storeRepository;
    private final RegionRepository regionRepository;
    private final RandomStringGenerator randomStringGenerator;
    private final FlyMailSender flyMailSender;
    private final PasswordEncoder passwordEncoder;
    private final DecimalFormatter decimalFormatter;

    @Autowired
    public UserServiceImpl(ConsumerRepository consumerRepository,
                           StoreRepository storeRepository,
                           RegionRepository regionRepository,
                           RandomStringGenerator randomStringGenerator,
                           FlyMailSender flyMailSender,
                           PasswordEncoder passwordEncoder,
                           DecimalFormatter decimalFormatter) {
        this.consumerRepository = consumerRepository;
        this.storeRepository = storeRepository;
        this.regionRepository = regionRepository;
        this.randomStringGenerator = randomStringGenerator;
        this.flyMailSender = flyMailSender;
        this.passwordEncoder = passwordEncoder;
        this.decimalFormatter = decimalFormatter;
    }

    // 1. ????????? ?????? ??????
    @Override
    public boolean checkIdDuplication(String inputId) {
        boolean hasConsumer = consumerRepository.findByUserId(inputId).orElse(null) != null;
        boolean hasStore = storeRepository.findByUserId(inputId).orElse(null) != null;

        return hasConsumer || hasStore;
    }

    // 2. ?????? ?????? ??????
    @Override
    public Map<String, Object> saveMember(RegisterReq registerReq) {
        Map<String, Object> result = new HashMap<>();
        HttpStatus statusCode = HttpStatus.CREATED;

        // ???????????? ?????????
        if (!registerReq.getPassword().equals(registerReq.getPassword2())) {
            throw new CustomException("?????? ?????? ??????????????? ?????????????????????.", statusCode);
        }

        ConsumerEntity consumer = consumerRepository.findByUserId(registerReq.getUserId()).orElse(null);
        StoreEntity store = storeRepository.findByUserId(registerReq.getUserId()).orElse(null);
        if (consumer != null || store != null) {
            throw new CustomException("?????? ?????? ?????? ??????????????????.", statusCode);
        }

        // ?????????(consumer) ?????? ?????? ??????
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

        // ?????????(store) ?????? ?????? ??????
        else if ("store".equals(registerReq.getType())) {
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
                    .holidays("false,false,false,false,false,false,false")
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

    // 3. ????????? ??????
    @Override
    public Map<String, Object> findID(FindIdReq findIdReq) {
        Map<String, Object> result = new HashMap<>();
        HttpStatus statusCode = HttpStatus.OK;

        String inputName = findIdReq.getName();
        String inputEmail = findIdReq.getEmail();

        // ???????????? ????????? ??????????????? (??????, ?????????, ????????????)??? ??????
        ConsumerEntity consumer = consumerRepository.findByNameAndEmailAndWithdrawal(inputName, inputEmail, false).orElse(null);
        StoreEntity store = storeRepository.findByNameAndEmailAndWithdrawal(inputName, inputEmail, false).orElse(null);

        // ?????? ??????
        if (consumer == null && store == null) {
            throw new CustomException("????????? ???????????? ????????? ????????? ????????????.", statusCode);
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

    // 4. ?????? ???????????? ??????
    @Override
    public Map<String, Object> issueTemporaryPassword(FindPwdReq findPwdReq) {
        Map<String, Object> result = new HashMap<>();
        HttpStatus statusCode = HttpStatus.OK;

        String inputUserId = findPwdReq.getUserId();
        String inputName = findPwdReq.getName();
        String inputEmail = findPwdReq.getEmail();

        // ???????????? ????????? ??????????????? (?????????, ??????, ?????????, ????????????)??? ??????
        ConsumerEntity consumer = consumerRepository.findByUserIdAndNameAndEmailAndWithdrawal(inputUserId, inputName, inputEmail, false).orElse(null);
        StoreEntity store = storeRepository.findByUserIdAndNameAndEmailAndWithdrawal(inputUserId, inputName, inputEmail, false).orElse(null);

        if (consumer == null && store == null) {
            throw new CustomException("????????? ???????????? ????????? ????????? ????????????.", statusCode);
        }

        // ?????? ???????????? ??????
        String tempPassword = randomStringGenerator.generateRandomPassword(10);
        logger.info("[TEMPORARY PASSWORD] - {}", tempPassword);

        // Database?????? ???????????? ????????????
        int success = -1;
        if (consumer != null) {
            success = consumerRepository.updatePassword(consumer.getId(), passwordEncoder.encode(tempPassword));
        } else {
            success = storeRepository.updatePassword(store.getId(), passwordEncoder.encode(tempPassword));
        }

        // ?????? ???????????? ?????? ?????? ??? ????????? ????????? ??????
        if (success > 0) {
            String content = String.format("?????? ??????????????? [%s] ?????????.\n" +
                    "????????? ?????? ????????? ??? ???????????? ?????? ????????????.", tempPassword);
            MailRes mailForm = MailRes.builder()
                    .address(inputEmail)
                    .title("[?????????] ?????? ???????????? ??????")
                    .message(content)
                    .build();
            flyMailSender.sendEmail(mailForm);
            result.put("result", true);
        } else {
            throw new CustomException("?????? ????????? ?????? ????????? ???????????? ??????????????????.", statusCode);
        }
        return result;
    }

    // 5. ????????? ?????? ??????
    @Override
    public boolean checkNicknameDuplication(String inputNickname) {
        return consumerRepository.findByNickname(inputNickname).orElse(null) != null;
    }

    // 6. ?????? ?????? ??????
    @Override
    @Transactional
    public Map<String, Object> updateUserInfo(ChangeInfoReq changeInfoReq, Authentication authentication) {
        Map<String, Object> result = new HashMap<>();
        HttpStatus statusCode = HttpStatus.CREATED;

        Long userPk = ((CustomUserDetail) authentication.getPrincipal()).getUserPk();
        String userType = ((CustomUserDetail) authentication.getPrincipal()).getUserType();

        if (UserType.CONSUMER.toString().equals(userType)) {
            String nickname = changeInfoReq.getNickname();
            String zipCode = changeInfoReq.getAddress().getZipCode();
            String street = changeInfoReq.getAddress().getStreet();
            String details = changeInfoReq.getAddress().getDetails();
            String sigunguCode = changeInfoReq.getAddress().getSigunguCode();
            if (consumerRepository.updateConsumerInfo(userPk, nickname, zipCode, street, details, sigunguCode) > 0) {
                result.put("result", true);
            } else {
                throw new CustomException("?????? ????????? ?????? ????????? ???????????? ??????????????????.", statusCode);
            }
        } else if (UserType.STORE.toString().equals(userType)) {
            StoreEntity store = storeRepository.findByIdAndWithdrawal(userPk, false).orElse(null);

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
                throw new CustomException("?????? ????????? ?????? ????????? ???????????? ??????????????????.", statusCode);
            }
        } else {
            throw new CustomException("????????? ?????? ???????????????.", statusCode);
        }

        return result;
    }

    // 7. ????????? ??????(?????????)
    @Override
    public Map<String, Object> updateIntroduction(String introduction, Authentication authentication) {
        Map<String, Object> result = new HashMap<>();
        HttpStatus statusCode = HttpStatus.CREATED;

        Long userPk = ((CustomUserDetail) authentication.getPrincipal()).getUserPk();

        if (storeRepository.updateIntroduction(userPk, introduction) > 0) {
            result.put("result", true);
        } else {
            throw new CustomException("????????? ?????? ???????????????.", statusCode);
        }

        return result;
    }

    // 8. ???????????? ??????
    @Override
    public Map<String, Object> updatePassword(ChangePwdReq changePwdReq, Authentication authentication) {
        Map<String, Object> result = new HashMap<>();
        HttpStatus statusCode = HttpStatus.CREATED;

        Long userPk = ((CustomUserDetail) authentication.getPrincipal()).getUserPk();
        String userPwd = ((CustomUserDetail) authentication.getPrincipal()).getPassword();
        String userType = ((CustomUserDetail) authentication.getPrincipal()).getUserType();

        String curPwd = changePwdReq.getCurPwd();
        String newPwd = changePwdReq.getNewPwd();
        String newPwd2 = changePwdReq.getNewPwd2();

        if (!newPwd.equals(newPwd2)) {
            throw new CustomException("?????? ?????? ??????????????? ?????????????????????.", statusCode);
        }

        // Database?????? ???????????? ????????????
        int success;
        if (UserType.CONSUMER.toString().equals(userType) && passwordEncoder.matches(curPwd, userPwd)) {
            success = consumerRepository.updatePassword(userPk, passwordEncoder.encode(newPwd));
        } else if (UserType.STORE.toString().equals(userType) && passwordEncoder.matches(curPwd, userPwd)) {
            success = storeRepository.updatePassword(userPk, passwordEncoder.encode(newPwd));
        } else {
            throw new CustomException("?????? ?????? ?????? ??????????????? ???????????? ????????????.", statusCode);
        }

        if (success > 0) {
            result.put("result", true);
        } else {
            throw new CustomException("?????? ????????? ?????? ????????? ???????????? ??????????????????.", statusCode);
        }

        return result;
    }

    // 9. ????????? ????????? ??????
    @Override
    public Map<String, Object> updateProfileImage(String image, Authentication authentication) {
        Map<String, Object> result = new HashMap<>();
        HttpStatus statusCode = HttpStatus.CREATED;

        Long userPk = ((CustomUserDetail) authentication.getPrincipal()).getUserPk();
        String userType = ((CustomUserDetail) authentication.getPrincipal()).getUserType();

        if (UserType.CONSUMER.toString().equals(userType)) {
            if (consumerRepository.updateProfileImage(userPk, image) > 0) {
                result.put("result", true);
            } else {
                throw new CustomException("?????? ????????? ?????? ????????? ???????????? ??????????????????.", statusCode);
            }
        } else if (UserType.STORE.toString().equals(userType)) {
            if (storeRepository.updateProfileImage(userPk, image) > 0) {
                result.put("result", true);
            } else {
                throw new CustomException("?????? ????????? ?????? ????????? ???????????? ??????????????????.", statusCode);
            }
        } else {
            throw new CustomException("????????? ?????? ???????????????.", statusCode);
        }

        return result;
    }

    // 10. ?????? ??????
    @Override
    public Map<String, Object> deleteUser(String password, Authentication authentication) {
        Map<String, Object> result = new HashMap<>();
        HttpStatus statusCode = HttpStatus.CREATED;

        Long userPk = ((CustomUserDetail) authentication.getPrincipal()).getUserPk();
        String userPwd = ((CustomUserDetail) authentication.getPrincipal()).getPassword();
        String userType = ((CustomUserDetail) authentication.getPrincipal()).getUserType();

        int success;
        if (UserType.CONSUMER.toString().equals(userType) && passwordEncoder.matches(password, userPwd)) {
            success = consumerRepository.accountWithdraw(userPk);
        } else if (UserType.STORE.toString().equals(userType) && passwordEncoder.matches(password, userPwd)) {
            success = storeRepository.accountWithdraw(userPk);
        } else {
            throw new CustomException("?????? ?????? ?????? ??????????????? ???????????? ????????????.", statusCode);
        }

        if (success > 0) {
            result.put("result", true);
        } else {
            throw new CustomException("?????? ????????? ?????? ????????? ???????????? ??????????????????.", statusCode);
        }

        return result;
    }

    // 11. ?????? ?????? ??????
    @Override
    public Map<String, Object> findUserInfo(Authentication authentication) {
        Map<String, Object> result = new HashMap<>();
        HttpStatus statusCode = HttpStatus.OK;

        Long userPk = ((CustomUserDetail) authentication.getPrincipal()).getUserPk();
        String userType = ((CustomUserDetail) authentication.getPrincipal()).getUserType();

        if (UserType.CONSUMER.toString().equals(userType)) {
            ConsumerEntity consumer = consumerRepository.findByIdAndWithdrawal(userPk, false).orElse(null);
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
        } else if (UserType.STORE.toString().equals(userType)) {
            StoreEntity store = storeRepository.findByIdAndWithdrawal(userPk, false).orElse(null);
            UserInfoRes.ForStore userInfo = UserInfoRes.ForStore.builder()
                    .type(store.getType().toString().toLowerCase())
                    .userPk(store.getId())
                    .userId(store.getUserId())
                    .name(store.getName())
                    .email(store.getEmail())
                    .storeName(store.getStore())
                    .license(store.getLicense())
                    .profile(store.getProfile())
                    .holidays(store.getBooleanHolidays())
                    .feedNum(store.getTotalFeed())
                    .rating(decimalFormatter.roundToTwoDecimalPlaces(store.getRating() == null ? 0 : store.getRating()))
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
            throw new CustomException("????????? ?????? ???????????????.", statusCode);
        }

        return result;
    }

    // 12. ????????? ????????? ?????? ??????
    @Override
    public Map<String, Object> findStoreInfo(Long storeId) {
        Map<String, Object> result = new HashMap<>();
        HttpStatus statusCode = HttpStatus.OK;

        StoreEntity store = storeRepository.findByIdAndWithdrawal(storeId, false).orElse(null);
        if (store == null) {
            throw new CustomException("???????????? ?????? ????????? ?????????(Long Type) ?????????.", statusCode);
        }

        StoreInfoRes.ForDetails storeInfo = StoreInfoRes.ForDetails.builder()
                .name(store.getName())
                .email(store.getEmail())
                .storeName(store.getStore())
                .address(String.format("%s %s", store.getStreet(), store.getDetailAddr()))
                .profile(store.getProfile())
                .holidays(store.getBooleanHolidays())
                .feedNum(store.getTotalFeed())
                .introduction(store.getBio())
                .rating(decimalFormatter.roundToTwoDecimalPlaces(store.getRating() == null ? 0 : store.getRating()))
                .build();

        result.put("result", true);
        result.put("storeInfo", storeInfo);

        return result;
    }

    // 13. ????????? ?????? ??????
    @Override
    public Map<String, Object> findStoreList(int pageNo, int size, String sort, String sido, String sigungu, String storeName) {
        Map<String, Object> result = new HashMap<>();
        HttpStatus statusCode = HttpStatus.OK;

        String sortKey = "";
        if ("reg".equals(sort)) sortKey = "id";
        else if ("order".equals(sort)) sortKey = "totalOrder";
        else if ("rating".equals(sort)) sortKey = "rating";
        else {
            throw new CustomException("?????? ????????? ?????? ????????? ????????????.", statusCode);
        }

        Pageable pageable = PageRequest.of((pageNo > 0 ? pageNo - 1 : 0), size, Sort.by(sortKey).descending());

        Page<StoreEntity> searchList = null;
        if ("??????".equals(sido) && "??????".equals(sigungu)) {
            searchList = storeRepository.findAllByStoreContainsAndWithdrawal(storeName, false, pageable);
        } else if (!"??????".equals(sido) && "??????".equals(sigungu)) {
            String sidoCode = regionRepository.findAllBySido(sido).get(0).getSidoCode();
            searchList = storeRepository.findAllByStoreContainsAndWithdrawalAndSigunguCodeStartsWith(storeName, false, sidoCode, pageable);
        } else if (!"??????".equals(sido) && !"??????".equals(sigungu)) {
            RegionEntity searchRegion = regionRepository.findBySidoAndSigungu(sido, sigungu);
            String fullCode = searchRegion.getSidoCode() + searchRegion.getSigunguCode();
            searchList = storeRepository.findAllByStoreContainsAndWithdrawalAndSigunguCodeEquals(storeName, false, fullCode, pageable);
        } else {
            throw new CustomException("????????? ???????????? ???????????????.", statusCode);
        }

        Map<String, Object> info = new HashMap<>();

        if (!searchList.isEmpty()) {
            List<StoreInfoRes.ForList> resultList = new ArrayList<>();
            for (StoreEntity curEntity : searchList) {
                StoreInfoRes.ForList storeInfo = StoreInfoRes.ForList.builder()
                        .storeId(curEntity.getId())
                        .storeName(curEntity.getStore())
                        .profile(curEntity.getProfile())
                        .holidays(curEntity.getBooleanHolidays())
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
            throw new CustomException("???????????? ?????? ??????????????????.", statusCode);
        }

        return result;
    }

    public List<RegionVo> findStoreList(String region1, String region2) {
        return storeRepository.findAll().stream().filter(store -> {
            String[] s = store.getStreet().split(" ");
            if ("??????".equals(region1) && "??????".equals(region2)) return true;
            else if ("??????".equals(region2)) return s[0].equals(region1);
            return s[0].equals(region1) && s[1].equals(region2);
        }).map(store -> {
            List<Boolean> holidays = store.getBooleanHolidays();
            return new RegionVo(store.getStreet(), store.getId(), store.getLatitude(), store.getLongitude(),
                    store.getStore(), store.getBio(), store.getProfile(),
                    decimalFormatter.roundToTwoDecimalPlaces(store.getRating() == null ? 0 : store.getRating()),
                    holidays);
        }).collect(Collectors.toList());
    }

    // 14. ????????? ?????? ????????? ?????? ??????
    @Override
    public void saveKakaoMember(KakaoUserInfo kakaoUserInfo) {
        ConsumerEntity newMember = ConsumerEntity.builder()
                .type(UserType.CONSUMER)
                .userId(kakaoUserInfo.getEmail())
                .password("")
                .name(kakaoUserInfo.getNickname())
                .nickname(kakaoUserInfo.getNickname())
                .email(kakaoUserInfo.getEmail())
                .regDate(new Date())
                .withdrawal(false)
                .build();
        consumerRepository.save(newMember);
    }
}
