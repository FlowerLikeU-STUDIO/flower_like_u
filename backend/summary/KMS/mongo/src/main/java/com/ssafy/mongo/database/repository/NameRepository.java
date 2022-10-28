package com.ssafy.mongo.database.repository;

import com.ssafy.mongo.database.document.NameDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NameRepository extends MongoRepository<NameDocument, String> {
    public List<NameDocument> findByFirstName(String firstName);
}
