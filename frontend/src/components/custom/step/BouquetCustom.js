import styles from "./BouquetCustom.module.scss";
import Link from "next/link";
import { selectPackage, selectSize } from "@/store/reducers/custom";
import { useDispatch, useSelector } from "react-redux";
import { SizeContent } from "./StepContents";
import CustomMenu from "./menu/CustomMenu";
import classNames from "classnames/bind";
import { packageContent } from "./StepContents";
import CustomPlace from "./customplace/CustomPlace";

const BuoquetCustom = () => {
  const cx = classNames.bind(styles);
  const dispatch = useDispatch();
  const customOption = useSelector((state) => state.custom);
  //* 현재 유저가 선택한 패키지 종류
  const packageKind = packageContent.engtitle[customOption.package];
  //* 현재 유저가 선택한 포장지 색 종류
  const packageColor = customOption.wrapper_color;

  const bouquetHandler = () => {
    dispatch(selectPackage(null));
    dispatch(selectSize(null));
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
        <div
          className={cx("custom_place", packageKind)}
          style={{
            backgroundColor: packageColor,
          }}
        >
          <CustomPlace />
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
