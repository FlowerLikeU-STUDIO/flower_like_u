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

    private Packing packing;
    private String size;
    private List<Flowers> flowers;
    private int price;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Packing {
        private String material;
        private String color;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Flowers {
        private String name;
        private int cnt;
        private List<String> color;
    }
}
