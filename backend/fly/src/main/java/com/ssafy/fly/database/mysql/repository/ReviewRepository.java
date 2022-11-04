package com.ssafy.fly.database.mysql.repository;

import com.ssafy.fly.database.mysql.entity.ReviewEntity;
import com.ssafy.fly.database.mysql.entity.StoreEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {
    List<ReviewEntity> findAllByStoreId(StoreEntity storeEntity, Pageable pageable);
    List<ReviewEntity> findAllByStoreId(StoreEntity storeEntity);
}
