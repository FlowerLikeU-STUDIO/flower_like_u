package com.ssafy.fly.database.mysql.repository;

import com.ssafy.fly.database.mysql.entity.StoreEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import javax.transaction.Transactional;
import java.util.Optional;

public interface StoreRepository extends JpaRepository<StoreEntity, Long> {
    public Optional<StoreEntity> findByUserId(String userId);
    public StoreEntity findByNameAndEmailAndWithdrawal(String name, String email, boolean isDeleted);

    public StoreEntity findByUserIdAndNameAndEmailAndWithdrawal(String userId, String name, String email, boolean isDeleted);

    public StoreEntity findByUserIdAndWithdrawal(String userId, boolean isDeleted);

    public Optional<StoreEntity> findByIdAndWithdrawal(Long id, boolean isDeleted); /** 새로 바꾼 함수(사용한 곳: 4개) */

    public Page<StoreEntity> findAllByStoreContainsAndWithdrawal(String storeName, boolean isDeleted, Pageable pageable);

    Page<StoreEntity> findAllByStoreContainsAndWithdrawalAndSigunguCodeStartsWith(String storeName, boolean isDeleted, String siCode, Pageable pageable);

    Page<StoreEntity> findAllByStoreContainsAndWithdrawalAndSigunguCodeEquals(String storeName, boolean isDeleted, String sidoCode, Pageable pageable);

    @Modifying
    @Transactional
    @Query("UPDATE StoreEntity as s " +
            "SET s.bio = :bio " +
            "WHERE s.id = :id")
    public int updateIntroduction(@Param("id") Long id,
                                  @Param("bio") String introduction);

    @Modifying
    @Transactional
    @Query("UPDATE StoreEntity as s " +
            "SET s.password = :newPassword " +
            "WHERE s.id = :id")
    public int updatePassword(@Param("id") Long id,
                              @Param("newPassword") String newPassword);

    @Modifying
    @Transactional
    @Query("UPDATE StoreEntity as s " +
            "SET s.profile = :profile " +
            "WHERE s.id = :id")
    public int updateProfileImage(@Param("id") Long id,
                                  @Param("profile") String image);

    @Modifying
    @Transactional
    @Query("UPDATE StoreEntity as s " +
            "SET s.withdrawal = true " +
            "WHERE s.id = :id")
    public int accountWithdraw(@Param("id") Long id);
}
