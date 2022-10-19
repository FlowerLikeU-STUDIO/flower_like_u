package com.ssafy.mongo.database.repository;

import com.ssafy.mongo.database.document.FlowerDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlowerRepository extends MongoRepository<FlowerDocument, String> {
    //public List<NameDocument> findByFirstName(String firstName);
}
