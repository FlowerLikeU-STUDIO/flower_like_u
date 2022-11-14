package com.ssafy.fly.database.mysql.repository;

import com.ssafy.fly.database.mysql.entity.BookEntity;
import com.ssafy.fly.database.mysql.entity.ConsumerEntity;
import com.ssafy.fly.database.mysql.entity.StoreEntity;
import com.ssafy.fly.database.mysql.enumtype.BookState;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface BookRepository extends JpaRepository<BookEntity, Long> {

    public void deleteById(Long id);

    @Query("SELECT b " +
            "FROM BookEntity as b " +
            "WHERE b.consumerId = :consumer And b.state = 'WAITED' Or b.state = 'INPROGRESS'")
    public Page<BookEntity> getConsumerOrderList(ConsumerEntity consumer, Pageable pageable);

    @Query("SELECT b " +
            "FROM BookEntity as b " +
            "WHERE b.consumerId = :consumer And b.state = 'RECIPT' Or b.state = 'DONE'")
    public Page<BookEntity> getConsumerDoneList(ConsumerEntity consumer, Pageable pageable);

    @Query("SELECT b " +
            "FROM BookEntity as b " +
            "WHERE b.storeId = :store And b.state = 'WAITED'")
    public Page<BookEntity> getStoreBookList(StoreEntity store, Pageable pageable);

    @Query("SELECT b " +
            "FROM BookEntity as b " +
            "WHERE b.storeId = :store And b.state = 'INPROGRESS'")
    public Page<BookEntity> getStoreProgressList(StoreEntity store, Pageable pageable);

    @Query("SELECT b " +
            "FROM BookEntity as b " +
            "WHERE b.storeId = :store And b.state = 'RECIPT' Or b.state = 'DONE'")
    public Page<BookEntity> getStoreDoneList(StoreEntity store, Pageable pageable);

    @Modifying
    @Transactional
    @Query("UPDATE BookEntity as b " +
            "SET b.state = :state " +
            "WHERE b.id = :bookId")
    public int updateBookState(@Param("bookId") Long bookId,
                               @Param("state") BookState state);
}
