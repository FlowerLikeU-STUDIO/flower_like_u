package com.ssafy.fly.database.mysql.repository;

import com.ssafy.fly.database.mysql.entity.BookEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<BookEntity, Long> {
}
