package com.ssafy.fly.database.mysql.repository;

import com.ssafy.fly.database.mysql.entity.FlowerAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlowerRepository extends JpaRepository<FlowerAsset, Long> {
}
