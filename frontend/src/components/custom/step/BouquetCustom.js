import styles from "./BouquetCustom.module.scss";
import Link from "next/link";
import { selectPackage, selectSize, makeCurrentLocation } from "@/store/reducers/custom";
import { useDispatch, useSelector } from "react-redux";
import { SizeContent } from "./StepContents";
import CustomMenu from "./menu/CustomMenu";
import Image from "next/image";
import { flower } from "./menu/MenuContents";

const BuoquetCustom = () => {
  const dispatch = useDispatch();
  const customOption = useSelector((state) => state.custom);

  //* 현재 유저가 커스텀한 꽃 정보가 담겨있습니다.
  //* console.log(`${flower[flowerList[0]].color}_${flower[flowerList[0]].name}`)
  //* 위 방식으로 인덱스별 꽃 정보에 접근할 수 있습니다.
  const flowerList = useSelector((state) => state.custom.flowers);

  const bouquetHandler = () => {
    dispatch(selectPackage(null));
    dispatch(selectSize(null));
  };

  //드래그 앤 드롭
  //* 꽃다발의 꽃 위치 영역 안에 꽃이 들어올 때 실행하는 함수
  //* current_location에 꽃 위치를 넣어줍니다.
  const onDragEnter = (e) => {
    e.preventDefault();
    dispatch(makeCurrentLocation(e.currentTarget.dataset.position));
  };

  //* 꽃다발의 꽃 위치 영역 위에 꽃이 있을 때 실행하는 함수
  //* current_location에 꽃 위치를 넣어줍니다.
  const onDragOver = (e) => {
    e.preventDefault();
    dispatch(makeCurrentLocation(e.currentTarget.dataset.position));
  };

  //* 꽃다발의 꽃 위치 영역에서 꽃이 떠날 때 실행하는 함수
  //* current_location을 초기화해줍니다.
  const onDragLeave = (e) => {
    e.preventDefault();
    dispatch(makeCurrentLocation(null));
  };

  return (
    <>
      <main className={styles.custom_wrapper}>
        <aside className={styles.recommend_wrapper}>
          <div className={styles.recommend_menu}>추천</div>
          <div className={styles.recommend_menu}>추천</div>
          <div className={styles.recommend_menu}>추천</div>
          <div className={styles.recommend_menu}>추천</div>
        </aside>
        <div className={styles.custom}>
          <div className={styles.circle_wrapper}>
            <div
              className={styles.circle_1}
              onDragEnter={onDragEnter}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              data-position={0}
            >
              <Image
                height={120}
                width={120}
                src={`/custom/flower/${flower[flowerList[0]].color}_${flower[flowerList[0]].name}.png`}
              />
            </div>
            <div
              className={styles.circle_2}
              onDragEnter={onDragEnter}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              data-position={1}
            >
              <Image
                height={120}
                width={120}
                src={`/custom/flower/${flower[flowerList[1]].color}_${flower[flowerList[1]].name}.png`}
              />
            </div>
            <div
              className={styles.circle_3}
              onDragEnter={onDragEnter}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              data-position={2}
            >
              <Image
                height={120}
                width={120}
                src={`/custom/flower/${flower[flowerList[2]].color}_${flower[flowerList[2]].name}.png`}
              />
            </div>
          </div>
        </div>
        <div className={styles.custom_info_wrapper}>
          <p className={styles.custom_info_package}>{SizeContent[customOption.package].kotitle} 커스텀</p>
          <p className={styles.custom_info_size}>{SizeContent[customOption.package].title[customOption.size]} 사이즈</p>
          <Link href="/custom/save">
            <div onClick={() => bouquetHandler()}>완성!</div>
          </Link>
        </div>
        <CustomMenu />
      </main>
    </>
  );
};

export default BuoquetCustom;
