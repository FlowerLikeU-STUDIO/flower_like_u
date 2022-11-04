import styles from "./BouquetCustom.module.scss";
import Link from "next/link";
import {
  selectPackage,
  selectSize,
  makeCurrentLocation,
} from "@/store/reducers/custom";
import { useDispatch, useSelector } from "react-redux";
import { SizeContent } from "./StepContents";
import CustomMenu from "./menu/CustomMenu";
import Image from "next/image";
import { flower } from "./menu/MenuContents";
import { useState } from "react";

const BuoquetCustom = () => {
  const dispatch = useDispatch();
  const customOption = useSelector((state) => state.custom);
  const flowerList = useSelector((state) => state.custom.flowers);

  const [name, setName] = useState([]);

  const flowerNameList = [];
  const update = () => {
    for (let i = 0; i < flowerList.length; i++) {
      if (flowerList[i] !== -1) {
        flowerNameList.push(`${flower[i].color}_${flower[i].name}`);
      } else if (flowerList[i] === -1) {
        flowerNameList.push("white_gypsophila");
      }
    }
    setName(flowerNameList);
    console.log(name);
  };

  const bouquetHandler = () => {
    dispatch(selectPackage(null));
    dispatch(selectSize(null));
  };

  //드래그 앤 드롭 관련 로직
  const onDragEnter = (e) => {
    e.preventDefault();
    dispatch(makeCurrentLocation(e.currentTarget.dataset.position));
  };

  const onDragOver = (e) => {
    e.preventDefault();
    update();
    dispatch(makeCurrentLocation(e.currentTarget.dataset.position));
  };

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
                src={`/custom/flower/${name[0]}.png`}
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
                src={`/custom/flower/${name[1]}.png`}
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
                src={`/custom/flower/${name[2]}.png`}
              />
            </div>
          </div>
        </div>
        <div className={styles.custom_info_wrapper}>
          <p className={styles.custom_info_package}>
            {SizeContent[customOption.package].kotitle} 커스텀
          </p>
          <p className={styles.custom_info_size}>
            {SizeContent[customOption.package].title[customOption.size]} 사이즈
          </p>
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
