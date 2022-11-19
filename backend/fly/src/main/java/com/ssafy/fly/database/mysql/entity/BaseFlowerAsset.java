package com.ssafy.fly.database.mysql.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "base_flower")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BaseFlowerAsset extends BaseEntity {
    /** 꽃의 이름(국문) */
    @Column(name = "base_name", length = 10, nullable = false)
    private String baseName;

    /** 꽃의 이름(영문) */
    @Column(name = "eng_name", length = 20, nullable = false)
    private String engName;

    @OneToMany(mappedBy = "baseId")
    @Builder.Default
    private List<FlowerAsset> flowers = new ArrayList<>();
}
