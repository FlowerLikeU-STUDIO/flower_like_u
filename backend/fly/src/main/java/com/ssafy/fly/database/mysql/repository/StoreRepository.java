package com.ssafy.fly.database.mysql.repository;

import com.ssafy.fly.database.mysql.entity.StoreEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface StoreRepository extends JpaRepository<StoreEntity, Long> {
    public StoreEntity findFirstByUserId(String inputId);

    public StoreEntity findByNameAndEmailAndWithdrawal(String name, String email, boolean isDeleted);

    public StoreEntity findByUserIdAndNameAndEmailAndWithdrawal(String userId, String name, String email, boolean isDeleted);

    public StoreEntity findByUserIdAndPasswordAndWithdrawal(String userId, String password, boolean isDeleted);

    public StoreEntity findByUserIdAndWithdrawal(String userId, boolean isDeleted);

    @Modifying
    @Transactional
    @Query("UPDATE StoreEntity as s " +
            "SET s.store = :store, s.address = :address " +
            "WHERE s.userId = :userId")
    public int updateStoreInfo(@Param("userId") String userId,
                               @Param("store") String storeName,
                               @Param("address") String address);

    @Modifying
    @Transactional
    @Query("UPDATE StoreEntity as s " +
            "SET s.bio = :bio " +
            "WHERE s.userId = :userId")
    public int updateIntroduction(@Param("userId") String userId,
                                  @Param("bio") String introduction);

    @Modifying
    @Transactional
    @Query("UPDATE StoreEntity as s " +
            "SET s.password = :newPassword " +
            "WHERE s.userId = :userId")
    public int updatePassword(@Param("userId") String userId,
                              @Param("newPassword") String newPassword);

    @Modifying
    @Transactional
    @Query("UPDATE StoreEntity as s " +
            "SET s.profile = :profile " +
            "WHERE s.userId = :userId")
    public int updateProfileImage(@Param("userId") String userId,
                                  @Param("profile") String image);

    @Modifying
    @Transactional
    @Query("UPDATE StoreEntity as s " +
            "SET s.withdrawal = true " +
            "WHERE s.userId = :userId And s.password = :password")
    public int accountWithdraw(@Param("userId") String userId,
                               @Param("password") String password);
}
