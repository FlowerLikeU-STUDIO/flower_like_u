package com.ssafy.fly.database.mysql.repository;

import com.ssafy.fly.database.mysql.entity.ConsumerEntity;
import com.ssafy.fly.database.mysql.enumtype.UserType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface ConsumerRepository extends JpaRepository<ConsumerEntity, Long> {
    public Optional<ConsumerEntity> findByUserId(String userId);

    public ConsumerEntity findByUserIdAndWithdrawal(String userId, boolean isDeleted);

    public ConsumerEntity findByNameAndEmailAndWithdrawal(String name, String email, boolean isDeleted);

    public ConsumerEntity findByUserIdAndNameAndEmailAndWithdrawal(String userId, String name, String email, boolean isDeleted);

    public Optional<ConsumerEntity> findByNickname(String nickname);

    public Optional<ConsumerEntity> findByIdAndWithdrawal(Long id, boolean isDeleted);

    @Modifying
    @Transactional
    @Query("UPDATE ConsumerEntity as c " +
            "SET c.nickname = :nickname, c.zipCode = :zipCode, c.street = :street, c.detailAddr = :details, c.sigunguCode = :sigunguCode " +
            "WHERE c.id = :id")
    public int updateConsumerInfo(@Param("id") Long id,
                                  @Param("nickname") String nickname,
                                  @Param("zipCode") String zipCode,
                                  @Param("street") String street,
                                  @Param("details") String details,
                                  @Param("sigunguCode") String sigunguCode);

    @Modifying
    @Transactional
    @Query("UPDATE ConsumerEntity as c " +
            "SET c.password = :newPassword " +
            "WHERE c.id = :id")
    public int updatePassword(@Param("id") Long id,
                              @Param("newPassword") String newPassword);

    @Modifying
    @Transactional
    @Query("UPDATE ConsumerEntity as c " +
            "SET c.profile = :profile " +
            "WHERE c.id = :id")
    public int updateProfileImage(@Param("id") Long id,
                                  @Param("profile") String image);

    @Modifying
    @Transactional
    @Query("UPDATE ConsumerEntity as c " +
            "SET c.withdrawal = true " +
            "WHERE c.id = :id")
    public int accountWithdraw(@Param("id") Long id);
}
