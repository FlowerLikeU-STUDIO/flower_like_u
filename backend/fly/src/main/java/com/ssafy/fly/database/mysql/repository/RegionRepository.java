package com.ssafy.fly.database.mysql.repository;

import com.ssafy.fly.database.mysql.entity.RegionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegionRepository extends JpaRepository<RegionEntity, Long> {
    public List<RegionEntity> findAllBySido(String sidoName);

    public RegionEntity findBySidoAndSigungu(String sidoName, String sigunguName);
}
