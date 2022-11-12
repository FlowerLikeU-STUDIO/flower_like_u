import styles from "./CustomPlace.module.scss";
import { makeCurrentLocation } from "@/store/reducers/custom";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { flower } from "../menu/MenuContents";
import classNames from "classnames/bind";
import { useState } from "react";

const CustomPlace = () => {
  const cx = classNames.bind(styles);
  const dispatch = useDispatch();
  const customOption = useSelector((state) => state.custom);

  //* 현재 유저가 커스텀한 꽃 정보가 담겨있습니다.
  //* console.log(`${flower[flowerList[0]].color}_${flower[flowerList[0]].name}`)
  //* 위 방식으로 인덱스별 꽃 정보에 접근할 수 있습니다.
  const flowerList = customOption.flowers;

  //* 사이즈 값
  const sizeList = ["xs", "s", "m", "l", "xl"];
  const currentSize = sizeList[customOption.size];

  //* 패키지 정보
  const packageList = ["wrapper", "vase", "ballon"];
  const currentPackage = packageList[customOption.package];

  //드래그 앤 드롭
  //* current_location을 업데이트하기 위한 state
  const [currentLocation, setCurrentLocation] = useState();

  //* 꽃다발의 꽃 위치 영역 안에 꽃이 들어올 때 실행하는 함수
  //* current_location에 꽃 위치를 넣어줍니다.
  // const onDragEnter = (e) => {
  //   e.preventDefault();
  //   dispatch(makeCurrentLocation(e.currentTarget.dataset.position));
  // };

  //* 꽃다발의 꽃 위치 영역 위에 꽃이 있을 때 실행하는 함수
  //* current_location에 꽃 위치를 넣어줍니다.
  const onDragOver = (e) => {
    e.preventDefault();
    setCurrentLocation(e.currentTarget.dataset.position);
    //* 어느 영역 위에 있는지 표시해 줍니다.
    const whichCircle = e.target;
    whichCircle.style.borderRadius = "100rem";
    whichCircle.style.backgroundColor = "rgba(221, 255, 146, 0.6)";
    whichCircle.style.border = "1px solid rgba(190, 235, 88, 1)";
  };

  //* 꽃다발의 꽃 위치 영역에서 꽃이 떠날 때 실행하는 함수
  //* current_location을 초기화해줍니다.
  const onDragLeave = (e) => {
    e.preventDefault();
    setCurrentLocation(null);
    //* 표시된 영역을 없애줍니다.
    const whichCircle = e.target;
    whichCircle.style.backgroundColor = "rgba(221, 255, 146, 0)";
    whichCircle.style.border = "1px solid rgba(190, 235, 88, 0)";
  };

  const onDrop = (e) => {
    e.preventDefault();
    dispatch(makeCurrentLocation(currentLocation));
    //* 표시된 영역을 없애줍니다.
    const whichCircle = e.target;
    whichCircle.style.backgroundColor = "rgba(221, 255, 146, 0)";
    whichCircle.style.border = "1px solid rgba(190, 235, 88, 0)";
  };

  return (
    <div className={cx("circle_wrapper", currentSize, currentPackage)}>
      {flowerList ? (
        flowerList.map((title, index) => (
          <div
            className={cx(`circle_${index + 1}`, currentSize, currentPackage)}
            // onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            data-position={index}
            key={index}
          >
            <Image
              height={300}
              width={300}
              src={`/custom/flower/${flower[flowerList[index]].color}_${
                flower[flowerList[index]].name
              }.png`}
            />
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default CustomPlace;
