package com.ssafy.mongo.database.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collation = "flowers")
public class FlowerDocument {
    @Id
    private String id;
}
