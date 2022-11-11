package com.ssafy.fly.database.mysql.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "region")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegionEntity extends BaseEntity {
    /** 시/도 구분을 위한 코드 */
    @Column(name = "sido_code", length = 2, nullable = false)
    private String sidoCode;

    /** 구/시/군 구분을 위한 코드 */
    @Column(name = "sigungu_code", length = 3, nullable = false)
    private String sigunguCode;

    /** 시/도 명 */
    @Column(name = "sido", length = 10, nullable = false)
    private String sido;

    /** 구/시/군 명 */
    @Column(name = "sigungu", length = 10, nullable = false)
    private String sigungu;
}
