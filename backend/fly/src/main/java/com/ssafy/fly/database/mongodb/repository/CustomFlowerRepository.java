package com.ssafy.fly.database.mongodb.repository;

import com.ssafy.fly.database.mongodb.document.CustomFlowerDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomFlowerRepository extends MongoRepository<CustomFlowerDocument, String> {
}
