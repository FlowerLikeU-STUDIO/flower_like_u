package com.ssafy.fly.database.mysql.repository;

import com.ssafy.fly.database.mysql.entity.RibbonAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RibbonRepository extends JpaRepository<RibbonAsset, Long> {
}
