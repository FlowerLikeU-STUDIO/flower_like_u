package com.ssafy.fly.database.mysql.entity;

import com.ssafy.fly.common.util.CustomUserDetail;
import com.ssafy.fly.database.mysql.enumtype.UserType;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Formula;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "store")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString(exclude = {"reviews", "books", "feeds"})
public class StoreEntity extends BaseEntity implements CustomUserDetail {
    @Column(name = "type", length = 10, nullable = false)
    @Enumerated(EnumType.STRING)
    UserType type;

    @Column(name = "user_id", length = 16, nullable = false)
    private String userId;

    @Column(name = "password", length = 100, nullable = false)
    private String password;

    @Column(name = "name", length = 30, nullable = false)
    private String name;

    @Column(name = "store", length = 50, nullable = false)
    private String store;

    @Column(name = "license", length = 12, nullable = false)
    private String license;

    @Column(name = "email", length = 50, nullable = false)
    private String email;

    @Column(name = "profile", nullable = true)
    @Lob
    private String profile;

    @Column(name = "zipcode", length = 5, nullable = false)
    private String zipCode;

    @Column(name = "street", length = 50, nullable = false)
    private String street;

    @Column(name = "detail_addr", length = 50, nullable = true)
    private String detailAddr;

    @Column(name = "sigungu_code", length = 5, nullable = false)
    private String sigunguCode;

    @Column(name = "holidays", nullable = true)
    private String holidays;

    @Column(name = "bio", length = 300, nullable = true)
    private String bio;

    @Column(name = "reg_date", nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date regDate;

    @Column(name = "withdrawal", nullable = true)
    @ColumnDefault("false")
    private boolean withdrawal;

    @Column(name = "latitude", nullable = false)
    private Double latitude;

    @Column(name = "longitude", nullable = false)
    private Double longitude;

    // store와 review 테이블의 1:N 관계 매핑
    @OneToMany(mappedBy = "storeId")
    @Builder.Default
    private List<ReviewEntity> reviews = new ArrayList<>();

    // store와 review 테이블의 1:N 관계 매핑
    @OneToMany(mappedBy = "storeId")
    @Builder.Default
    private List<BookEntity> books = new ArrayList<>();

    @OneToMany(mappedBy = "storeId")
    @Builder.Default
    private List<FeedEntity> feeds = new ArrayList<>();

    /** 피드 수 */
    @Formula("(SELECT count(*) FROM feed f WHERE f.store_id = id And f.removal = false)")
    private int totalFeed;

    /** 별점 평균 */
    @Formula("(SELECT avg(r.rating) FROM review r WHERE r.store_id = id)")
    private Double rating;

    /** 누적 주문량 */
    @Formula("(SELECT count(*) FROM book b WHERE b.store_id = id)")
    private int totalOrder;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new SimpleGrantedAuthority("USER"));

        return authorities;
    }

    @Override
    public Long getUserPk() {return super.getId();}

    @Override
    public String getUserType() { return "STORE";}

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
