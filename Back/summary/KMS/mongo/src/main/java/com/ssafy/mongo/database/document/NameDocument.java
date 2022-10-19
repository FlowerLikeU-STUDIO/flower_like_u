package com.ssafy.mongo.database.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "name")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NameDocument {
    @Id
    private String id;

    private String firstName;
    private String lastName;
}
