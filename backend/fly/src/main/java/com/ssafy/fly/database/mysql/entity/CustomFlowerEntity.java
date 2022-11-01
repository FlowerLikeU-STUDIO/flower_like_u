package com.ssafy.fly.database.mysql.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "custom_flower")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
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
}
