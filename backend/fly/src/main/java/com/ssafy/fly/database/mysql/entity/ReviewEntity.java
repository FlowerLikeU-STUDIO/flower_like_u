package com.ssafy.fly.database.mysql.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "review")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ReviewEntity extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    @JsonIgnore
    private StoreEntity storeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consumer_id")
    @JsonIgnore
    private ConsumerEntity consumerId;

    @OneToOne
    @JoinColumn(name = "book_id")
    @JsonIgnore
    private BookEntity bookId;

    @Column(name = "rating", nullable = false)
    private Double rating;

    @Column(name = "content", length = 100, nullable = true)
    private String content;

    @Column(name = "date", nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date regDate;

    @Formula("(SELECT date_format(r.date, '%Y-%m-%d') FROM review r where r.id = id)")
    private String dateOnly;
}
