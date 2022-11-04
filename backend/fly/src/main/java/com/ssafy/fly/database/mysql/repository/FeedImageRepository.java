package com.ssafy.fly.database.mysql.repository;

import com.ssafy.fly.database.mysql.entity.FeedImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedImageRepository extends JpaRepository<FeedImageEntity, Long> {
}
