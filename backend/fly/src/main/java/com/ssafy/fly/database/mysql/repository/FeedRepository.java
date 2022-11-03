package com.ssafy.fly.database.mysql.repository;

import com.ssafy.fly.database.mysql.entity.FeedEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedRepository extends JpaRepository<FeedEntity, Long> {
}
