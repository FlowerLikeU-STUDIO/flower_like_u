package com.ssafy.fly.database.mysql.repository;

import com.ssafy.fly.database.mysql.entity.ConsumerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface ConsumerRepository extends JpaRepository<ConsumerEntity, Long> {
    public ConsumerEntity findFirstByUserId(String inputId);

    public ConsumerEntity findByNameAndEmailAndWithdrawal(String name, String email, boolean isDeleted);

    public ConsumerEntity findByUserIdAndNameAndEmailAndWithdrawal(String userId, String name, String email, boolean isDeleted);

    public ConsumerEntity findByNickname(String nickname);

    public ConsumerEntity findByUserIdAndPasswordAndWithdrawal(String userId, String password, boolean isDeleted);

    public ConsumerEntity findByUserIdAndWithdrawal(String userId, boolean isDeleted);

    @Modifying
    @Transactional
    @Query("UPDATE ConsumerEntity as c " +
            "SET c.nickname = :nickname, c.address = :address " +
            "WHERE c.userId = :userId")
    public int updateConsumerInfo(@Param("userId") String userId,
                                  @Param("nickname") String nickname,
                                  @Param("address") String address);

    @Modifying
    @Transactional
    @Query("UPDATE ConsumerEntity as c " +
            "SET c.password = :newPassword " +
            "WHERE c.userId = :userId")
    public int updatePassword(@Param("userId") String userId,
                              @Param("newPassword") String newPassword);

    @Modifying
    @Transactional
    @Query("UPDATE ConsumerEntity as c " +
            "SET c.profile = :profile " +
            "WHERE c.userId = :userId")
    public int updateProfileImage(@Param("userId") String userId,
                                  @Param("profile") String image);

    @Modifying
    @Transactional
    @Query("UPDATE ConsumerEntity as c " +
            "SET c.withdrawal = true " +
            "WHERE c.userId = :userId And c.password = :password")
    public int accountWithdraw(@Param("userId") String userId,
                               @Param("password") String password);
}
