package com.ssafy.fly.service;

import com.ssafy.fly.common.util.DateConvertor;
import com.ssafy.fly.database.mongodb.document.CustomFlowerDocument;
import com.ssafy.fly.database.mongodb.repository.CustomFlowerMongoRepository;
import com.ssafy.fly.database.mysql.entity.BookEntity;
import com.ssafy.fly.database.mysql.entity.ConsumerEntity;
import com.ssafy.fly.database.mysql.entity.CustomFlowerEntity;
import com.ssafy.fly.database.mysql.entity.StoreEntity;
import com.ssafy.fly.database.mysql.enumtype.BookState;
import com.ssafy.fly.database.mysql.enumtype.BookType;
import com.ssafy.fly.database.mysql.repository.BookRepository;
import com.ssafy.fly.database.mysql.repository.ConsumerRepository;
import com.ssafy.fly.database.mysql.repository.CustomFlowerRepository;
import com.ssafy.fly.database.mysql.repository.StoreRepository;
import com.ssafy.fly.dto.request.BookCustomFlowerReq;
import com.ssafy.fly.dto.response.BookListRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service("bookService")
@Transactional
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final ConsumerRepository consumerRepository;
    private final StoreRepository storeRepository;
    private final CustomFlowerRepository customFlowerRepository;
    private final CustomFlowerMongoRepository customFlowerMongoRepository;
    private final DateConvertor dateConvertor;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository,
                           ConsumerRepository consumerRepository,
                           StoreRepository storeRepository,
                           CustomFlowerRepository customFlowerRepository,
                           CustomFlowerMongoRepository customFlowerMongoRepository,
                           DateConvertor dateConvertor) {
        this.bookRepository = bookRepository;
        this.consumerRepository = consumerRepository;
        this.storeRepository = storeRepository;
        this.customFlowerRepository = customFlowerRepository;
        this.customFlowerMongoRepository = customFlowerMongoRepository;
        this.dateConvertor = dateConvertor;
    }

    // 1. 꽃다발 예약(커스텀 꽃다발)
    @Override
    public Map<String, Object> registCustomFlowerBookInfo(BookCustomFlowerReq bookCustomFlowerReq) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        String consumerId = bookCustomFlowerReq.getConsumerId();
        Long storeId = bookCustomFlowerReq.getStoreId();
        String flowerId = bookCustomFlowerReq.getFlowerId();
        Date dueDate = bookCustomFlowerReq.getDueDate();

        ConsumerEntity consumer = consumerRepository.findByUserIdAndWithdrawal(consumerId, false);
        if (consumer == null) {
            message = "존재하지 않는 구매자 계정입니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        StoreEntity store = storeRepository.findByIdAndWithdrawal(storeId, false);
        if (store == null) {
            message = "존재하지 않는 판매자 계정입니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        CustomFlowerEntity flowerBasicInfo = customFlowerRepository.findByDesignIdAndRemoval(flowerId, false);
        if (flowerBasicInfo == null) {
            message = "존재하지 않는 커스텀 꽃다발 아이디입니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        CustomFlowerDocument flowerDetails = customFlowerMongoRepository.findById(flowerId).orElse(null);
        if (flowerDetails == null) {
            message = "존재하지 않는 커스텀 꽃다발 상세 정보입니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        BookEntity bookInfo = BookEntity.builder()
                .consumerId(consumer)
                .storeId(store)
                .customId(flowerBasicInfo)
                .bookDate(new Date())
                .dueDate(dueDate)
                .request(bookCustomFlowerReq.getRequest() != null ? bookCustomFlowerReq.getRequest() : "")
                .state(BookState.WAITED)
                .type(BookType.CUSTOM)
                .build();

        bookRepository.save(bookInfo);

        result.put("result", true);
        return result;
    }

    // 2. 꽃다발 예약(피드)

    // 3. 예약 상태 변경
    @Override
    public Map<String, Object> updateBookState(Long bookId) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        BookEntity bookInfo = bookRepository.findById(bookId).orElse(null);
        if (bookInfo == null) {
            message = "존재하지 않는 예약 아이디(Long Type) 입니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        BookState newState = null;
        if (BookState.WAITED.equals(bookInfo.getState())) newState = BookState.INPROGRESS;
        else if (BookState.INPROGRESS.equals(bookInfo.getState())) newState = BookState.RECIPT;
        else if (BookState.RECIPT.equals(bookInfo.getState())) newState = BookState.DONE;
        else {
            message = "잘못된 예약 상태가 존재합니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        if (bookRepository.updateBookState(bookId, newState) > 0) {
            result.put("result", true);
        } else {
            message = "서버 문제로 업데이트에 실패하였습니다.";
            result.put("result", false);
        }

        result.put("message", message);
        return result;
    }

    // 4. 예약 목록 조회
    @Override
    public Map<String, Object> getBookInfoList(String userId, int pageNo, int size, String filter) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        ConsumerEntity consumer = consumerRepository.findByUserIdAndWithdrawal(userId, false);
        StoreEntity store = storeRepository.findByUserIdAndWithdrawal(userId, false);

        if (consumer == null && store == null) {
            message = "존재하지 않는 계정입니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        Pageable pageable = PageRequest.of((pageNo > 0 ? pageNo - 1 : 0), size);
        Page<BookEntity> searchList = null;

        Map<String, Object> info = new HashMap<>();

        if (consumer != null) {
            // 필터에 따라 리스트 검색
            if ("order".equals(filter)) {
                searchList = bookRepository.getConsumerOrderList(consumer, pageable);
            } else if ("done".equals(filter)) {
                searchList = bookRepository.getConsumerDoneList(consumer, pageable);
            }

            if (searchList != null && searchList.getSize() > 0) {
                List<BookListRes.BookElementForConsumer> resultList = new ArrayList<>();
                for (BookEntity curEntity : searchList) {
                    BookListRes.BookElementForConsumer bookInfo = BookListRes.BookElementForConsumer.builder()
                            .bookId(curEntity.getId())
                            .type(curEntity.getType().toString().toLowerCase())
                            .storeName(curEntity.getStoreId().getStore())
                            .image(curEntity.getCustomId().getImage())
                            .request(curEntity.getRequest())
                            .bookDate(curEntity.getBookDate())
                            .dueDate(curEntity.getDueDate())
                            .state(curEntity.getState().toString().toLowerCase())
                            .build();
                    resultList.add(bookInfo);
                }

                info.put("maxPage", searchList.getTotalPages());
                info.put("filter", filter);
                info.put("list", resultList);
                result.put("result", true);
                result.put("info", info);

                return result;
            }
        } else if (store != null) {
            // 필터에 따라 리스트 검색
            if ("book".equals(filter)) {
                searchList = bookRepository.getStoreBookList(store, pageable);
            } else if ("progress".equals(filter)) {
                searchList = bookRepository.getStoreProgressList(store, pageable);
            } else if ("done".equals(filter)) {
                searchList = bookRepository.getStoreDoneList(store, pageable);
            }

            if (searchList != null && searchList.getSize() > 0) {
                List<BookListRes.BookElementForStore> resultList = new ArrayList<>();
                for (BookEntity curEntity : searchList) {
                    BookListRes.BookElementForStore bookInfo = BookListRes.BookElementForStore.builder()
                            .bookId(curEntity.getId())
                            .type(curEntity.getType().toString().toLowerCase())
                            .consumerName(curEntity.getConsumerId().getName())
                            .image(curEntity.getCustomId().getImage())
                            .request(curEntity.getRequest())
                            .bookDate(curEntity.getBookDate())
                            .dueDate(curEntity.getDueDate())
                            .state(curEntity.getState().toString().toLowerCase())
                            .build();
                    resultList.add(bookInfo);
                }

                info.put("maxPage", searchList.getTotalPages());
                info.put("filter", filter);
                info.put("list", resultList);
                result.put("result", true);
                result.put("info", info);

                return result;
            }
        }

        message = "잘못된 입력입니다.";
        System.out.println(message);
        result.put("result", false);
        result.put("message", message);
        return result;
    }

    // 5. 예약 목록 상세 조회(커스텀, 피드)
    @Override
    public Map<String, Object> getDetailBookInfo(Long bookId) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        BookEntity book = bookRepository.findById(bookId).orElse(null);

        if (book != null) {
            Map<String, Object> bookInfo = new HashMap<>();

            if (BookType.CUSTOM.equals(book.getType())) {
                String designId = book.getCustomId().getDesignId();
                BookListRes.BookElementForAll basicInfo = BookListRes.BookElementForAll.builder()
                        .bookId(book.getId())
                        .type(book.getType().toString().toLowerCase())
                        .image(book.getCustomId().getImage())
                        .request(book.getRequest())
                        .bookDate(book.getBookDate())
                        .dueDate(book.getDueDate())
                        .state(book.getState().toString().toLowerCase())
                        .consumerName(book.getConsumerId().getName())
                        .storeName(book.getStoreId().getStore())
                        .build();
                CustomFlowerDocument detailInfo = customFlowerMongoRepository.findById(designId).orElse(null);

                bookInfo.put("basics", basicInfo);
                bookInfo.put("details", detailInfo);
            } else if (BookType.FEED.equals(book.getType())) {
                message = "미구현";
                System.out.println("미구현");
            }

            result.put("bookInfo", bookInfo);
            result.put("result", true);
        } else {
            message = "예약 아이디와 일치하는 정보가 없습니다. 예약 아이디를 확인해주세요.";
            result.put("result", false);
        }

        result.put("message", message);
        return result;
    }

    // 6. 예약 취소
    @Override
    public Map<String, Object> deleteBookInfo(Long bookId) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        if (bookRepository.findById(bookId).orElse(null) == null) {
            message = "예약 아이디와 일치하는 정보가 없습니다. 예약 아이디를 확인해주세요.";
            result.put("result", false);
        } else {
            bookRepository.deleteById(bookId);
            result.put("result", true);
        }

        result.put("message", message);
        return result;
    }
}