package com.ssafy.fly.database.mysql.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "feed_image")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString()
public class FeedImageEntity extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_id")
    @JsonIgnore
    private FeedEntity feedId;

    @Column(name = "image", nullable = true)
    @Lob
    private String image;
}
