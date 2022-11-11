package com.ssafy.fly.database.mysql.repository;

import com.ssafy.fly.database.mysql.entity.FeedEntity;
import com.ssafy.fly.database.mysql.entity.StoreEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface FeedRepository extends JpaRepository<FeedEntity, Long> {
    public Page<FeedEntity> findByStoreIdAndRemoval(StoreEntity storeId, boolean isRemoved, Pageable pageable);
    public FeedEntity findByIdAndRemoval(Long feedId, boolean isRemoved);

    public List<FeedEntity> findAllByStoreIdAndRemoval(StoreEntity store, boolean isRemoved);

    @Modifying
    @Transactional
    @Query("UPDATE FeedEntity as f " +
            "SET f.removal = true " +
            "WHERE f.id = :feedId")
    public int feedRemove(@Param("feedId") Long feedId);
}
