package com.ssafy.fly.database.mysql.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.fly.database.mysql.enumtype.BookState;
import com.ssafy.fly.database.mysql.enumtype.BookType;
import lombok.*;
import org.hibernate.annotations.Formula;

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

    // 예약 번호
//    @Column(name = "book_num", length = 10, nullable = false)
//    private String bookNum;

    @Column(name = "book_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date bookDate;

    @Column(name = "due_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date dueDate;

    @Column(name = "request", nullable = true)
    private String request;

    @Column(name = "state", length = 10, nullable = false)
    @Enumerated(EnumType.STRING)
    private BookState state;

    @Column(name = "type", length = 10, nullable = false)
    @Enumerated(EnumType.STRING)
    private BookType type;

    @OneToOne(mappedBy = "bookId")
    @Builder.Default
    private ReviewEntity review = null;

    @Formula("(SELECT date_format(b.book_date, '%Y-%m-%d') FROM book b WHERE b.id = id)")
    private String bookDateOnly;

    @Formula("(SELECT date_format(b.due_date, '%Y-%m-%d') FROM book b WHERE b.id = id)")
    private String dueDateOnly;
}
