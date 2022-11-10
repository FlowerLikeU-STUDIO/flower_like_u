package com.ssafy.fly.database.mysql.repository;

import com.ssafy.fly.database.mysql.entity.BaseFlowerAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BaseFlowerRepository extends JpaRepository<BaseFlowerAsset, Long> {
}
