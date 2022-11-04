package com.ssafy.fly.database.mysql.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.fly.database.mysql.enumtype.BookState;
import com.ssafy.fly.database.mysql.enumtype.BookType;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "book")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookEntity extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consumer_id")
    @JsonIgnore
    private ConsumerEntity consumerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    @JsonIgnore
    private StoreEntity storeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "custom_id")
    @JsonIgnore
    private CustomFlowerEntity customId ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_id")
    @JsonIgnore
    private FeedEntity feedId;

    @Column(name = "book_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date bookDate;

    @Column(name = "due_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date dueDate;

    @Column(name = "request", nullable = true)
    private String request;

    @Column(name = "state", nullable = false)
    @Enumerated(EnumType.STRING)
    private BookState state;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    private BookType type;
}
