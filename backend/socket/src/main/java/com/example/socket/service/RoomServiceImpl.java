package com.example.socket.service;

import com.example.socket.document.Room;
import com.example.socket.domain.User;
import com.example.socket.dto.request.RoomCntPutReqDto;
import com.example.socket.dto.response.RoomNoLatestMessageResDto;
import com.example.socket.repository.RoomRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@Service
public class RoomServiceImpl implements RoomService{

    private final RoomRepository roomRepository;
    private final UserService userService;
    @Autowired
    public RoomServiceImpl(RoomRepository roomRepository, UserService userService) {
        this.roomRepository = roomRepository;
        this.userService = userService;
    }

    private List<RoomNoLatestMessageResDto> getRoomNoLatest(List<Room> roomLst, String userType) {
        return roomLst.stream().map(room -> {
            RoomNoLatestMessageResDto roomNoLatestMessageResDto = new RoomNoLatestMessageResDto();
            roomNoLatestMessageResDto.setId(room.getId());
            roomNoLatestMessageResDto.setConsumerId(room.getConsumerId());
            roomNoLatestMessageResDto.setStoreId(room.getStoreId());
            roomNoLatestMessageResDto.setLatestMessage(room.getLatestMessage());
            roomNoLatestMessageResDto.setUuid(room.getUuid());
            roomNoLatestMessageResDto.setConsumerNotReadCnt(room.getConsumerNotReadCnt());
            roomNoLatestMessageResDto.setStoreNotReadCnt(room.getStoreNotReadCnt());
            User user;
            if (userType.equals("CONSUMER"))
                user = userService.getUser("STORE", room.getStoreId());
            else
                user = userService.getUser("CONSUMER", room.getConsumerId());
            roomNoLatestMessageResDto.setImgSrc(user.getImgSrc());
            roomNoLatestMessageResDto.setName(user.getName());
            return roomNoLatestMessageResDto;
        }).collect(Collectors.toList());
    }

    public List<RoomNoLatestMessageResDto> getList(String userType, Long id) {
        List<Room> RoomList;
        if (userType.equals("CONSUMER")) {
            RoomList = roomRepository.findAllByConsumerId(id);
        }
        else
            RoomList = roomRepository.findAllByStoreId(id);
        return getRoomNoLatest(RoomList,userType);
    }

    public Room create(Long storeId, Long consumerId) {
        try {
            return roomRepository.save(new Room(storeId,consumerId));
        } catch (Exception e) {
            throw new IllegalArgumentException("방 생성에 실패했습니다.");
        }
    }

    public Optional<Room> getOptRoom(Long storeId, Long consumerId) {
        return roomRepository.findByStoreIdAndConsumerId(storeId, consumerId);
    }

    @Transactional
    public void updateAdd(String id, String latestMessage, String userType, String uuid) {
        Room room = roomRepository.findById(id).orElseThrow(new Supplier<IllegalArgumentException>() {
            @Override
            public IllegalArgumentException get() {
                return new IllegalArgumentException("해당 방이 없습니다.");
            }
        });
        if (latestMessage.equals(""))
            room.setLatestMessage("사진");
        else
            room.setLatestMessage(latestMessage);
        room.setUuid(uuid);
        if (userType.equals("store"))
            room.setStoreNotReadCnt(room.getStoreNotReadCnt() + 1);
        else
            room.setConsumerNotReadCnt(room.getConsumerNotReadCnt() + 1);
        try {
            roomRepository.save(room);
        } catch(Exception e) {
            throw new IllegalArgumentException("최신 메세지 갱신에 실패했습니다.");
        }
    }

    @Transactional
    public void resetCnt(RoomCntPutReqDto roomCntPutReqDto) {
        Room room = roomRepository.findById(roomCntPutReqDto.getId()).orElseThrow(new Supplier<IllegalArgumentException>() {
            @Override
            public IllegalArgumentException get() {
                return new IllegalArgumentException("해당 방이 없습니다.");
            }
        });
        try {
            if (roomCntPutReqDto.getUserType().equals("store"))
                room.setStoreNotReadCnt(0);
            else
                room.setConsumerNotReadCnt(0);

            roomRepository.save(room);
        } catch (Exception e) {
            throw new IllegalArgumentException("카운트 갱신에 실패했습니다.");
        }
    }
}
