package com.ssafy.fly.database.mysql.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "feed")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString(exclude = {"books"})
public class FeedEntity extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    @JsonIgnore
    private StoreEntity storeId;

    @Column(name = "name", length = 20, nullable = false)
    private String name;

    @Column(name = "price", nullable = false)
    private int price;

    @Column(name = "content", length = 300, nullable = false)
    private String content;

    @Column(name = "image", nullable = true)
    @Lob
    private String image;

    @Column(name = "removal", nullable = false)
    private boolean removal;

    // feed와 book 테이블의 1:N 관계 매핑
    @OneToMany(mappedBy = "feedId")
    @Builder.Default
    private List<BookEntity> books = new ArrayList<>();
}
