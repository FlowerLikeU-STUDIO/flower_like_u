package com.ssafy.fly.database.mysql.entity;

import com.ssafy.fly.common.util.CustomUserDetail;
import com.ssafy.fly.database.mysql.enumtype.UserType;
import jdk.nashorn.internal.runtime.logging.Logger;
import lombok.*;
import lombok.extern.java.Log;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
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
public class ConsumerEntity extends BaseEntity implements CustomUserDetail {
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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new SimpleGrantedAuthority("USER"));

        return authorities;
    }
    @Override
    public Long getUserPk() {return super.getId();}

    @Override
    public String getUserType() { return "CONSUMER";}
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return userId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}