package com.ssafy.mongo.database.repository;

import com.ssafy.mongo.database.document.TestDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestRepository extends MongoRepository<TestDocument, String> {
    public List<TestDocument> findByFirstName(String firstName);
}
