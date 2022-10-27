package com.ssafy.fly.database.mysql.entity;

import com.ssafy.fly.database.mysql.enumtype.UserType;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "consumer")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
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

    @Column(name = "nickname", length = 30, nullable = false)
    private String nickname;

    @Column(name = "email", length = 50, nullable = false)
    private String email;

    @Column(name = "profile", nullable = true)
    @Lob
    private String profile;

    @Column(name = "address", length = 200, nullable = true)
    private String address;

    @Column(name = "reg_date", nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date regDate;

    @Column(name = "withdrawal")
    private boolean withdrawal;
}
