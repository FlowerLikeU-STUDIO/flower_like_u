package com.ssafy.fly.database.mysql.entity;

import com.ssafy.fly.database.mysql.entity.BaseEntity;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "wrapper")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WrapperAsset extends BaseEntity {
    /** 에셋의 이름 ex) 종이 포장지 */
    @Column(name = "name", length = 30, nullable = false)
    private String name;

    /** 설명 */
    @Column(name = "description", length = 150, nullable = false)
    private String description;

    /** 영문 색상명 */
    @Column(name = "color_name", length = 30, nullable = false)
    private String colorName;

    /** 색상의 HEX Code */
    @Column(name = "hexcode", length = 7, nullable = false)
    private String hexcode;
}
