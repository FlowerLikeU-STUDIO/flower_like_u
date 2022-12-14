package com.ssafy.fly.database.mysql.repository;

import com.ssafy.fly.database.mysql.entity.ConsumerEntity;
import com.ssafy.fly.database.mysql.entity.CustomFlowerEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface CustomFlowerRepository extends JpaRepository<CustomFlowerEntity, Long> {
    public Optional<CustomFlowerEntity> findByDesignIdAndRemoval(String flowerId, boolean isRemoved);
    public Page<CustomFlowerEntity> findAllByConsumerIdAndRemoval(ConsumerEntity consumer, boolean isRemoved, Pageable pageable);

    @Modifying
    @Transactional
    @Query("UPDATE CustomFlowerEntity as c " +
            "SET c.removal = true " +
            "WHERE c.designId = :flowerId")
    public int customFlowerRemove(@Param("flowerId") String flowerId);
}
