package com.ssafy.fly.database.mongodb.document;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    /** 꽃의 개수를 세어 "OO꽃 O송이"의 List로 반환하는 함수 */
    public List<String> cntFlowerNumber() {
        int flowerNum = this.flowers.size();

        Map<String, Integer> unitCnt = new HashMap<>();
        for (int i = 0; i < flowerNum; i++) {
            String flowerName = this.flowers.get(i);
            if(unitCnt.containsKey(flowerName)) {
                unitCnt.put(flowerName, unitCnt.get(flowerName) + 1);
            } else {
                unitCnt.put(flowerName, 1);
            }
        }

        List<String> flowers = new ArrayList<>();
        for(Map.Entry<String, Integer> entry : unitCnt.entrySet()) {
            flowers.add(String.format("%s %d송이", entry.getKey(), entry.getValue()));
        }

        return flowers;
    }
}
