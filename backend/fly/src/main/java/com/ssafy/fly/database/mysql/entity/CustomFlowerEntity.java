package com.ssafy.fly.database.mysql.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "custom_flower")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString(exclude = {"books"})
public class CustomFlowerEntity extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consumer_id")
    @JsonIgnore
    private ConsumerEntity consumerId;

    @Column(name = "info_id", nullable = false)
    private String designId;

    @Column(name = "image", nullable = true)
    @Lob
    private String image;

    @Column(name = "removal", nullable = false)
    @JsonIgnore
    private Boolean removal;

    // custom_flower와 book 테이블의 1:N 관계 매핑
    @OneToMany(mappedBy = "customId")
    @Builder.Default
    @JsonIgnore
    private List<BookEntity> books = new ArrayList<>();
}
