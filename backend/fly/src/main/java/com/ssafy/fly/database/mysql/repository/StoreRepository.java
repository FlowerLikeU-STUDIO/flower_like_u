package com.ssafy.fly.database.mysql.repository;

import com.ssafy.fly.database.mysql.entity.StoreEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreRepository extends JpaRepository<StoreEntity, Long> {
}
