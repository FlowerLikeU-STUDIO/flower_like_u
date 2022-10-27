package com.ssafy.fly.database.mysql.repository;

import com.ssafy.fly.database.mysql.entity.ConsumerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsumerRepository extends JpaRepository<ConsumerEntity, Long> {
}
