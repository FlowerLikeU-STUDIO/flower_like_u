package com.ssafy.fly.database.mysql.repository;

import com.ssafy.fly.database.mysql.entity.WrapperAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WrapperRepository extends JpaRepository<WrapperAsset, Long> {
}
