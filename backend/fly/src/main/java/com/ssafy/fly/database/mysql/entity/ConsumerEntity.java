package com.ssafy.fly.database.mysql.entity;

import com.ssafy.fly.database.mysql.enumtype.UserType;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "consumer")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString(exclude = {"customFlowers", "reviews", "books"})
public class ConsumerEntity extends BaseEntity {
    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    UserType type;

    @Column(name = "user_id", length = 16, nullable = false)
    private String userId;

    @Column(name = "password", length = 100, nullable = false)
    private String password;

    @Column(name = "name", length = 30, nullable = false)
    private String name;

    @Column(name = "nickname", length = 10, nullable = false)
    private String nickname;

    @Column(name = "email", length = 50, nullable = false)
    private String email;

    @Column(name = "profile", nullable = true)
    @Lob
    private String profile;

    @Column(name = "zipcode", length = 5, nullable = true)
    private String zipCode;

    @Column(name = "street", length = 50, nullable = true)
    private String street;

    @Column(name = "detail_addr", length = 50, nullable = true)
    private String detailAddr;

    @Column(name = "sigungu_code", length = 5, nullable = true)
    private String sigunguCode;

    @Column(name = "reg_date", nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date regDate;

    @Column(name = "withdrawal")
    private boolean withdrawal;

    // consumer과 custom_flower 테이블의 1:N 관계 매핑
    @OneToMany(mappedBy = "consumerId")
    @Builder.Default
    private List<CustomFlowerEntity> customFlowers = new ArrayList<>();

    // consumer과 review 테이블의 1:N 관계 매핑
    @OneToMany(mappedBy = "consumerId")
    @Builder.Default
    private List<ReviewEntity> reviews = new ArrayList<>();

    // consumer과 book 테이블의 1:N 관계 매핑
    @OneToMany(mappedBy = "consumerId")
    @Builder.Default
    private List<BookEntity> books = new ArrayList<>();
}
