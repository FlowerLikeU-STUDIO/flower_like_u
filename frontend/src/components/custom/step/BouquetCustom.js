import styles from "./BouquetCustom.module.scss";
import Link from "next/link";
import { selectPackage, selectSize } from "@/store/reducers/custom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { SizeContent } from "./StepContents";
import { useState } from "react";
import CustomMenu from "./menu/CustomMenu";

const BuoquetCustom = () => {
  const dispatch = useDispatch();
  const customOption = useSelector((state) => state.custom);

  const bouquetHandler = () => {
    dispatch(selectPackage(null));
    dispatch(selectSize(null));
  };

  //드래그 앤 드롭 관련 로직
  const [enter, setEnter] = useState(0);
  const [tmp, setTmp] = useState(null);

  const onDragEnter = (e) => {
    console.log("들어왔다!");
    setEnter(1);
  };

  const onDragOver = (e) => {
    console.log("지금 위에 있어!");
    setTmp(e.currentTarget.dataset.position);
    console.log(tmp);
    setEnter(1);
  };

  const onDragLeave = (e) => {
    console.log("나갔다!");
    setEnter(0);
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
            ></div>
            <div
              className={styles.circle_2}
              onDragEnter={onDragEnter}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              data-position={1}
            ></div>
            <div
              className={styles.circle_3}
              onDragEnter={onDragEnter}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              data-position={2}
            ></div>
          </div>
        </div>
        <div className={styles.custom_info_wrapper}>
          <p className={styles.custom_info_package}>{SizeContent[customOption.package].kotitle} 커스텀</p>
          <p className={styles.custom_info_size}>{SizeContent[customOption.package].title[customOption.size]} 사이즈</p>
          <Link href="/custom/save">
            <div onClick={() => bouquetHandler()}>완성!</div>
          </Link>
        </div>
        <CustomMenu enter={enter} />
      </main>
    </>
  );
};

export default BuoquetCustom;
