import styles from "./BouquetCustom.module.scss";
import Link from "next/link";
import { selectPackage, selectSize } from "@/store/reducers/custom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { SizeContent } from "./StepContents";

const BuoquetCustom = () => {
  const dispatch = useDispatch();
  const customOption = useSelector((state) => state.custom);

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
        <div className={styles.custom} />
        <div className={styles.custom_info_wrapper}>
          <p>
            {SizeContent[customOption.package].title[customOption.size]} 사이즈
          </p>
          <p>{SizeContent[customOption.package].kotitle} 패키지</p>
          <Link href="/custom/save">
            <div onClick={() => bouquetHandler()}>완성!</div>
          </Link>
        </div>
        <div className={styles.custom_option}>옵션</div>
      </main>
    </>
  );
};

export default BuoquetCustom;
