package com.ssafy.fly.service;

import com.ssafy.fly.common.exception.CustomException;
import com.ssafy.fly.common.util.CustomUserDetail;
import com.ssafy.fly.database.mysql.entity.*;
import com.ssafy.fly.database.mongodb.document.CustomFlowerDocument;
import com.ssafy.fly.database.mongodb.repository.CustomFlowerMongoRepository;
import com.ssafy.fly.database.mysql.enumtype.BookState;
import com.ssafy.fly.database.mysql.enumtype.BookType;
import com.ssafy.fly.database.mysql.enumtype.UserType;
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
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
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
    private final FeedRepository feedRepository;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository,
                           ConsumerRepository consumerRepository,
                           StoreRepository storeRepository,
                           CustomFlowerRepository customFlowerRepository,
                           CustomFlowerMongoRepository customFlowerMongoRepository,
                           FeedRepository feedRepository) {
        this.bookRepository = bookRepository;
        this.consumerRepository = consumerRepository;
        this.storeRepository = storeRepository;
        this.customFlowerRepository = customFlowerRepository;
        this.customFlowerMongoRepository = customFlowerMongoRepository;
        this.feedRepository = feedRepository;
    }

    // 1. ????????? ??????(????????? ?????????)
    @Override
    public Map<String, Object> registCustomFlowerBookInfo(BookCustomFlowerReq bookCustomFlowerReq, Authentication authentication) {
        Map<String, Object> result = new HashMap<>();
        HttpStatus statusCode = HttpStatus.CREATED;

        Long userPk = ((CustomUserDetail) authentication.getPrincipal()).getUserPk();

        Long storeId = bookCustomFlowerReq.getStoreId();
        String flowerId = bookCustomFlowerReq.getFlowerId();
        Date dueDate = bookCustomFlowerReq.getDueDate();

        StoreEntity store = storeRepository.findByIdAndWithdrawal(storeId, false).orElse(null);
        if (store == null) {
            throw new CustomException("???????????? ?????? ????????? ???????????????.", statusCode);
        }

        CustomFlowerEntity flowerBasicInfo = customFlowerRepository.findByDesignIdAndRemoval(flowerId, false).orElse(null);
        if (flowerBasicInfo == null) {
            throw new CustomException("???????????? ?????? ????????? ????????? ??????????????????.", statusCode);
        }

        if (!flowerBasicInfo.getConsumerId().getId().equals(userPk)) {
            throw new CustomException("????????? ??? ?????? ????????? ????????? ???????????????.", statusCode);
        }

        CustomFlowerDocument flowerDetails = customFlowerMongoRepository.findById(flowerId).orElse(null);
        if (flowerDetails == null) {
            throw new CustomException("???????????? ?????? ????????? ????????? ?????? ???????????????.", statusCode);
        }

        ConsumerEntity consumer = consumerRepository.findByIdAndWithdrawal(userPk, false).orElse(null);
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

    // 2. ????????? ??????(??????)
    @Override
    public Map<String, Object> registFeedFlowerBookInfo(BookFeedFlowerReq bookFeedFlowerReq, Authentication authentication) {
        Map<String, Object> result = new HashMap<>();
        HttpStatus statusCode = HttpStatus.CREATED;

        Long userPk = ((CustomUserDetail) authentication.getPrincipal()).getUserPk();

        Long storeId = bookFeedFlowerReq.getStoreId();
        Long feedId = bookFeedFlowerReq.getFeedId();
        Date dueDate = bookFeedFlowerReq.getDueDate();

        StoreEntity store = storeRepository.findByIdAndWithdrawal(storeId, false).orElse(null);
        if (store == null) {
            throw new CustomException("???????????? ?????? ????????? ???????????????.", statusCode);
        }

        FeedEntity feed = feedRepository.findByIdAndRemoval(feedId, false).orElse(null);
        if (feed == null) {
            throw new CustomException("???????????? ?????? ?????? ??????????????????.", statusCode);
        }

        if (!storeId.equals(feed.getStoreId().getId())) {
            throw new CustomException("????????? ????????? ???????????? ???????????? ????????? ???????????? ???????????? ???????????? ????????????.", statusCode);
        }

        ConsumerEntity consumer = consumerRepository.findByIdAndWithdrawal(userPk, false).orElse(null);
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

    // 3. ?????? ?????? ??????
    @Override
    public Map<String, Object> updateBookState(Long bookId, Authentication authentication) {
        Map<String, Object> result = new HashMap<>();
        HttpStatus statusCode = HttpStatus.CREATED;

        Long userPk = ((CustomUserDetail) authentication.getPrincipal()).getUserPk();
        String userType = ((CustomUserDetail) authentication.getPrincipal()).getUserType();

        BookEntity bookInfo = bookRepository.findById(bookId).orElse(null);
        if (bookInfo == null) {
            throw new CustomException("???????????? ?????? ?????? ?????????(Long Type) ?????????.", statusCode);
        }

        BookState newState = null;
        if (BookState.WAITED.equals(bookInfo.getState())
                && UserType.STORE.toString().equals(userType)
                && bookInfo.getStoreId().getId().equals(userPk)) newState = BookState.INPROGRESS;
        else if (BookState.INPROGRESS.equals(bookInfo.getState())
                && UserType.CONSUMER.toString().equals(userType)
                && bookInfo.getConsumerId().getId().equals(userPk)) newState = BookState.RECIPT;
        else {
            throw new CustomException("????????? ???????????????, ????????? ??? ?????? ?????? ??? ????????????.", statusCode);
        }

        if (bookRepository.updateBookState(bookId, newState) > 0) {
            result.put("result", true);
        } else {
            throw new CustomException("?????? ????????? ??????????????? ?????????????????????.", statusCode);
        }

        return result;
    }

    // 4. ?????? ?????? ??????
    @Override
    public Map<String, Object> getBookInfoList(int pageNo, int size, String filter, Authentication authentication) {
        Map<String, Object> result = new HashMap<>();
        HttpStatus statusCode = HttpStatus.OK;

        Long userPk = ((CustomUserDetail) authentication.getPrincipal()).getUserPk();
        String userType = ((CustomUserDetail) authentication.getPrincipal()).getUserType();

        Pageable pageable = PageRequest.of((pageNo > 0 ? pageNo - 1 : 0), size, Sort.by("id").descending());
        Page<BookEntity> searchList = null;
        Map<String, Object> info = new HashMap<>();

        if (UserType.CONSUMER.toString().equals(userType)) {
            ConsumerEntity consumer = consumerRepository.findByIdAndWithdrawal(userPk, false).orElse(null);
            // ????????? ?????? ????????? ??????
            if ("order".equals(filter)) {
                searchList = bookRepository.getConsumerOrderList(consumer, pageable);
            } else if ("done".equals(filter)) {
                searchList = bookRepository.getConsumerDoneList(consumer, pageable);
            } else {
                throw new CustomException("????????? ??? ?????? ???????????????.", statusCode);
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
                            .bookDate(curEntity.getBookDateOnly())
                            .dueDate(curEntity.getDueDateOnly())
                            .state(curEntity.getState().toString().toLowerCase())
                            .build();
                    resultList.add(bookInfo);
                }

                info.put("maxPage", searchList.getTotalPages());
                info.put("filter", filter);
                info.put("list", resultList);
                result.put("result", true);
                result.put("info", info);
            } else {
                throw new CustomException("???????????? ?????? ??????????????????.", statusCode);
            }
        } else if (UserType.STORE.toString().equals(userType)) {
            StoreEntity store = storeRepository.findByIdAndWithdrawal(userPk, false).orElse(null);
            // ????????? ?????? ????????? ??????
            if ("book".equals(filter)) {
                searchList = bookRepository.getStoreBookList(store, pageable);
            } else if ("progress".equals(filter)) {
                searchList = bookRepository.getStoreProgressList(store, pageable);
            } else if ("done".equals(filter)) {
                searchList = bookRepository.getStoreDoneList(store, pageable);
            }

            if (searchList != null && !searchList.getContent().isEmpty()) {
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
                            .bookDate(curEntity.getBookDateOnly())
                            .dueDate(curEntity.getDueDateOnly())
                            .state(curEntity.getState().toString().toLowerCase())
                            .build();
                    resultList.add(bookInfo);
                }

                info.put("maxPage", searchList.getTotalPages());
                info.put("filter", filter);
                info.put("list", resultList);
                result.put("result", true);
                result.put("info", info);
            } else {
                throw new CustomException("???????????? ?????? ??????????????????.", statusCode);
            }
        } else {
            throw new CustomException("???????????? ?????? ??????????????????.", statusCode);
        }

        return result;
    }

    // 5. ?????? ?????? ?????? ??????(?????????, ??????)
    @Override
    public Map<String, Object> getDetailBookInfo(Long bookId, Authentication authentication) {
        Map<String, Object> result = new HashMap<>();
        HttpStatus statusCode = HttpStatus.OK;

        Long userPk = ((CustomUserDetail) authentication.getPrincipal()).getUserPk();
        String userType = ((CustomUserDetail) authentication.getPrincipal()).getUserType();

        BookEntity book = bookRepository.findById(bookId).orElse(null);
        if (book == null) {
            throw new CustomException("?????? ???????????? ???????????? ????????? ????????????. ?????? ???????????? ??????????????????.", statusCode);
        }

        if ((UserType.CONSUMER.toString().equals(userType) && book.getConsumerId().getId().equals(userPk))
                || (UserType.STORE.toString().equals(userType) && book.getStoreId().getId().equals(userPk))) {

            Map<String, Object> bookInfo = new HashMap<>();

            if (BookType.CUSTOM.equals(book.getType())) {
                String designId = book.getCustomId().getDesignId();
                BookListRes.BookElementForAll basicInfo = BookListRes.BookElementForAll.builder()
                        .bookId(book.getId())
                        .type(book.getType().toString().toLowerCase())
                        .image(book.getCustomId().getImage())
                        .request(book.getRequest())
                        .bookDate(book.getBookDateOnly())
                        .dueDate(book.getDueDateOnly())
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
                        .image(!book.getFeedId().getImages().isEmpty() ? book.getFeedId().getImages().get(0).getImage() : null)
                        .request(book.getRequest())
                        .bookDate(book.getBookDateOnly())
                        .dueDate(book.getDueDateOnly())
                        .state(book.getState().toString().toLowerCase())
                        .consumerName(book.getConsumerId().getName())
                        .storeName(book.getStoreId().getStore())
                        .consumerId(book.getConsumerId().getUserId())
                        .storeId(book.getStoreId().getId())
                        .reviewId(book.getReview() != null ? book.getReview().getId() : null)
                        .build();
                bookInfo.put("basics", basicInfo);
            }

            result.put("bookInfo", bookInfo);
            result.put("result", true);
        } else {
            throw new CustomException("????????? ?????? ???????????????.", statusCode);
        }

        return result;
    }

    // 6. ?????? ??????
    @Override
    public Map<String, Object> deleteBookInfo(Long bookId, Authentication authentication) {
        Map<String, Object> result = new HashMap<>();
        HttpStatus statusCode = HttpStatus.OK;

        Long userPk = ((CustomUserDetail) authentication.getPrincipal()).getUserPk();

        BookEntity book = bookRepository.findById(bookId).orElse(null);
        if (book == null) {
            throw new CustomException("?????? ???????????? ???????????? ????????? ????????????. ?????? ???????????? ??????????????????.", statusCode);
        }

        if (book.getConsumerId().getId().equals(userPk)) {
            if (book.getState().equals(BookState.WAITED)) {
                bookRepository.deleteById(bookId);
                result.put("result", true);
            } else {
                throw new CustomException("?????? ????????? ???????????? ?????? ????????? ??? ????????????.", statusCode);
            }
        } else {
            throw new CustomException("?????? ????????? ????????????.", statusCode);
        }

        return result;
    }
}