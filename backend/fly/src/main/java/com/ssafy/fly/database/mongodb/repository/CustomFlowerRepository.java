package com.ssafy.fly.database.mongodb.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomFlowerRepository extends MongoRepository<CustomFlowerRepository, Long> {
}
