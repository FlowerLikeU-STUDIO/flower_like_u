package com.ssafy.fly.database.mysql.entity;

import com.ssafy.fly.database.mysql.entity.BaseEntity;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name = "ribbon")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RibbonAsset extends BaseEntity {
    /** 에셋의 제목 ex) 끈 리본 */
    @Column(name = "name", length = 30, nullable = false)
    private String name;

    /** 설명 */
    @Column(name = "description", length = 150, nullable = false)
    private String description;

    /** 영문 색상명 */
    @Column(name = "color_name", length = 30, nullable = false)
    private String colorName;

    /** 에셋 이미지의 BASE64 인코딩 값  */
    @Column(name = "image", nullable = false)
    @Lob
    private String image;
}
