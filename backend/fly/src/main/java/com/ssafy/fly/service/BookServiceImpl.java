package com.ssafy.fly.service;

import com.ssafy.fly.common.util.DateConvertor;
import com.ssafy.fly.database.mysql.entity.*;
import com.ssafy.fly.database.mongodb.document.CustomFlowerDocument;
import com.ssafy.fly.database.mongodb.repository.CustomFlowerMongoRepository;
import com.ssafy.fly.database.mysql.enumtype.BookState;
import com.ssafy.fly.database.mysql.enumtype.BookType;
import com.ssafy.fly.database.mysql.repository.*;
import com.ssafy.fly.dto.request.BookCustomFlowerReq;
import com.ssafy.fly.dto.request.BookFeedFlowerReq;
import com.ssafy.fly.dto.response.BookListRes;
import com.ssafy.fly.dto.response.CustomDetailRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.Principal;
import java.util.*;

@Service("bookService")
@Transactional
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final ConsumerRepository consumerRepository;
    private final StoreRepository storeRepository;
    private final CustomFlowerRepository customFlowerRepository;
    private final CustomFlowerMongoRepository customFlowerMongoRepository;
    private final FeedRepository feedRepository;
    private final DateConvertor dateConvertor;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository,
                           ConsumerRepository consumerRepository,
                           StoreRepository storeRepository,
                           CustomFlowerRepository customFlowerRepository,
                           CustomFlowerMongoRepository customFlowerMongoRepository,
                           FeedRepository feedRepository,
                           DateConvertor dateConvertor) {
        this.bookRepository = bookRepository;
        this.consumerRepository = consumerRepository;
        this.storeRepository = storeRepository;
        this.customFlowerRepository = customFlowerRepository;
        this.customFlowerMongoRepository = customFlowerMongoRepository;
        this.feedRepository = feedRepository;
        this.dateConvertor = dateConvertor;
    }

    // 1. 꽃다발 예약(커스텀 꽃다발)
    @Override
    public Map<String, Object> registCustomFlowerBookInfo(BookCustomFlowerReq bookCustomFlowerReq, Principal principal) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        String consumerId = principal.getName();
        Long storeId = bookCustomFlowerReq.getStoreId();
        String flowerId = bookCustomFlowerReq.getFlowerId();
        Date dueDate = bookCustomFlowerReq.getDueDate();

        ConsumerEntity consumer = consumerRepository.findByUserIdAndWithdrawal(consumerId, false);
        if (consumer == null) {
            message = "잘못된 토큰 정보입니다.";
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

        if (!flowerBasicInfo.getConsumerId().getUserId().equals(principal.getName())) {
            message = "접근할 수 없는 커스텀 꽃다발 정보입니다.";
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
    @Override
    public Map<String, Object> registFeedFlowerBookInfo(BookFeedFlowerReq bookFeedFlowerReq, Principal principal) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        String consumerId = principal.getName();
        Long storeId = bookFeedFlowerReq.getStoreId();
        Long feedId = bookFeedFlowerReq.getFeedId();
        Date dueDate = bookFeedFlowerReq.getDueDate();

        ConsumerEntity consumer = consumerRepository.findByUserIdAndWithdrawal(consumerId, false);
        if (consumer == null) {
            message = "잘못된 토큰 정보입니다.";
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

        FeedEntity feed = feedRepository.findByIdAndRemoval(feedId, false);
        if (feed == null) {
            message = "존재하지 않는 피드 아이디입니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        System.out.printf("[ID LOG] : %d %d\n", storeId, feed.getStoreId().getId());

        if (!storeId.equals(feed.getStoreId().getId())) {
            message = "잘못된 요청입니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        BookEntity bookInfo = BookEntity.builder()
                .consumerId(consumer)
                .storeId(store)
                .feedId(feed)
                .bookDate(new Date())
                .dueDate(dueDate)
                .request(bookFeedFlowerReq.getRequest() != null ? bookFeedFlowerReq.getRequest() : "")
                .state(BookState.WAITED)
                .type(BookType.FEED)
                .build();

        bookRepository.save(bookInfo);

        result.put("result", true);
        return result;
    }

    // 3. 예약 상태 변경
    @Override
    public Map<String, Object> updateBookState(Long bookId, Principal principal) {
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

        ConsumerEntity consumer = consumerRepository.findByUserIdAndWithdrawal(principal.getName(), false);
        StoreEntity store = storeRepository.findByUserIdAndWithdrawal(principal.getName(), false);
        if (consumer == null && store == null) {
            message = "잘못된 토큰 정보입니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        BookState newState = null;
        if (BookState.WAITED.equals(bookInfo.getState())
                && store != null
                && store.getId() == bookInfo.getStoreId().getId()) newState = BookState.INPROGRESS;
        else if (BookState.INPROGRESS.equals(bookInfo.getState())
                && consumer != null
                && consumer.getId() == bookInfo.getConsumerId().getId()) newState = BookState.RECIPT;
        else {
            message = "잘못된 요청이거나, 요청을 더 이상 받을 수 없습니다.";
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
    public Map<String, Object> getBookInfoList(int pageNo, int size, String filter, Principal principal) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        ConsumerEntity consumer = consumerRepository.findByUserIdAndWithdrawal(principal.getName(), false);
        StoreEntity store = storeRepository.findByUserIdAndWithdrawal(principal.getName(), false);

        if (consumer == null && store == null) {
            message = "잘못된 토큰 정보입니다.";
            System.out.println(message);
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        Pageable pageable = PageRequest.of((pageNo > 0 ? pageNo - 1 : 0), size, Sort.by("id").descending());
        Page<BookEntity> searchList = null;

        Map<String, Object> info = new HashMap<>();

        if (consumer != null) {
            // 필터에 따라 리스트 검색
            if ("order".equals(filter)) {
                searchList = bookRepository.getConsumerOrderList(consumer.getId(), pageable);
            } else if ("done".equals(filter)) {
                searchList = bookRepository.getConsumerDoneList(consumer.getId(), pageable);
            }

            if (searchList != null && searchList.getContent().size() > 0) {
                List<BookListRes.BookElementForConsumer> resultList = new ArrayList<>();
                for (BookEntity curEntity : searchList) {
                    String image = "";
                    if (BookType.CUSTOM.equals(curEntity.getType())) {
                        image = curEntity.getCustomId().getImage();
                    } else {
                        image = curEntity.getFeedId().getImages().get(0).getImage();
                    }
                    BookListRes.BookElementForConsumer bookInfo = BookListRes.BookElementForConsumer.builder()
                            .bookId(curEntity.getId())
                            .type(curEntity.getType().toString().toLowerCase())
                            .storeName(curEntity.getStoreId().getStore())
                            .image(image)
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
                searchList = bookRepository.getStoreBookList(store.getId(), pageable);
            } else if ("progress".equals(filter)) {
                searchList = bookRepository.getStoreProgressList(store.getId(), pageable);
            } else if ("done".equals(filter)) {
                searchList = bookRepository.getStoreDoneList(store.getId(), pageable);
            }

            if (searchList != null && searchList.getContent().size() > 0) {
                List<BookListRes.BookElementForStore> resultList = new ArrayList<>();
                for (BookEntity curEntity : searchList) {
                    String image = "";
                    if (BookType.CUSTOM.equals(curEntity.getType())) {
                        image = curEntity.getCustomId().getImage();
                    } else {
                        image = curEntity.getFeedId().getImages().get(0).getImage();
                    }

                    BookListRes.BookElementForStore bookInfo = BookListRes.BookElementForStore.builder()
                            .bookId(curEntity.getId())
                            .type(curEntity.getType().toString().toLowerCase())
                            .consumerName(curEntity.getConsumerId().getName())
                            .image(image)
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
    public Map<String, Object> getDetailBookInfo(Long bookId, Principal principal) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        BookEntity book = bookRepository.findById(bookId).orElse(null);
        if (book == null) {
            message = "예약 아이디와 일치하는 정보가 없습니다. 예약 아이디를 확인해주세요.";
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        ConsumerEntity consumer = consumerRepository.findByUserIdAndWithdrawal(principal.getName(), false);
        StoreEntity store = storeRepository.findByUserIdAndWithdrawal(principal.getName(), false);
        if (consumer == null && store == null) {
            message = "잘못된 토큰 정보입니다.";
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        if ((consumer != null && principal.getName().equals(book.getConsumerId().getUserId()))
                || (store != null && principal.getName().equals(book.getStoreId().getUserId()))) {

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
                        .consumerId(book.getConsumerId().getUserId())
                        .storeId(book.getStoreId().getId())
                        .reviewId(book.getReview() != null ? book.getReview().getId() : null)
                        .build();
                CustomFlowerDocument customInfo = customFlowerMongoRepository.findById(designId).orElse(null);

                CustomDetailRes detailInfo = CustomDetailRes.builder()
                        .type(customInfo.getType())
                        .wrapper(customInfo.getWrapper())
                        .ribbon(customInfo.getRibbon())
                        .size(customInfo.getSize())
                        .flowers(customInfo.cntFlowerNumber())
                        .build();

                bookInfo.put("basics", basicInfo);
                bookInfo.put("details", detailInfo);
            } else if (BookType.FEED.equals(book.getType())) {
                BookListRes.BookElementForAll basicInfo = BookListRes.BookElementForAll.builder()
                        .bookId(book.getId())
                        .type(book.getType().toString().toLowerCase())
                        .image(book.getFeedId().getImages().size() > 0 ? book.getFeedId().getImages().get(0).getImage() : null)
                        .request(book.getRequest())
                        .bookDate(book.getBookDate())
                        .dueDate(book.getDueDate())
                        .state(book.getState().toString().toLowerCase())
                        .consumerName(book.getConsumerId().getName())
                        .storeName(book.getStoreId().getStore())
                        .consumerId(book.getConsumerId().getUserId())
                        .storeId(book.getStoreId().getId())
                        .reviewId(book.getReview().getId())
                        .build();
                bookInfo.put("basics", basicInfo);
            }

            result.put("bookInfo", bookInfo);
            result.put("result", true);
        } else {
            message = "잘못된 접근입니다.";
            result.put("result", false);
            result.put("message", message);
        }

        return result;
    }

    // 6. 예약 취소
    @Override
    public Map<String, Object> deleteBookInfo(Long bookId, Principal principal) {
        Map<String, Object> result = new HashMap<>();
        String message = "";

        ConsumerEntity consumer = consumerRepository.findByUserIdAndWithdrawal(principal.getName(), false);
        if (consumer == null) {
            message = "잘못된 토큰 정보입니다.";
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        BookEntity book = bookRepository.findById(bookId).orElse(null);
        if (book == null) {
            message = "예약 아이디와 일치하는 정보가 없습니다. 예약 아이디를 확인해주세요.";
            result.put("result", false);
            result.put("message", message);
            return result;
        }

        if (principal.getName().equals(book.getConsumerId().getUserId())) {
            if (book.getState().equals(BookState.WAITED)) {
                bookRepository.deleteById(bookId);
                result.put("result", true);
            } else {
                message = "이미 제작이 진행되고 있어 취소할 수 없습니다.";
                result.put("result", false);
            }
        } else {
            message = "접근 권한이 없습니다.";
            result.put("result", false);
        }

        result.put("message", message);
        return result;
    }
}