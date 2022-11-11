package com.ssafy.fly.database.mysql.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "flower")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FlowerAsset extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "base_id")
    private BaseFlowerAsset baseId;

    /** 에셋의 제목 ex) 빨간색 장미 */
    @Column(name = "title", length = 30, nullable = false)
    private String title;

    /** 설명 */
    @Column(name = "description", length = 150, nullable = false)
    private String description;

    /** 에셋 이미지의 BASE64 인코딩 값  */
    @Column(name = "image", nullable = false)
    @Lob
    private String image;

    /** 영문 색상명 */
    @Column(name = "color_name", length = 30, nullable = false)
    private String colorName;

    /** 꽃말 */
    @Column(name = "language", length = 100, nullable = true)
    private String language;
}
