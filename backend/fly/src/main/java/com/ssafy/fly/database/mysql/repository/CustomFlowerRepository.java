package com.ssafy.fly.database.mysql.repository;

import com.ssafy.fly.database.mysql.entity.ConsumerEntity;
import com.ssafy.fly.database.mysql.entity.CustomFlowerEntity;
import com.ssafy.fly.service.CustomFlowerService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomFlowerRepository extends JpaRepository<CustomFlowerEntity, Long> {
    public CustomFlowerEntity findByDesignId(String flowerId);
    public Page<CustomFlowerEntity> findAllByConsumerId(ConsumerEntity consumer, Pageable pageable);
}
