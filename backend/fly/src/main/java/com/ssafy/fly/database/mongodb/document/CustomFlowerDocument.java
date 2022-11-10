package com.ssafy.fly.database.mongodb.document;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "my_flowers")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustomFlowerDocument {
    @Id
    @JsonIgnore
    private String id;

    private String type;
    private String wrapper;
    private String ribbon;
    private String size;
    private List<String> flowers;
}
