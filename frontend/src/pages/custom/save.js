import styles from "./save.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { packageContent } from "@/components/custom/step/StepContents";
import CustomPlace from "@/components/custom/step/customplace/CustomPlace";
import { wrapper, ribbon, flower } from "@/components/custom/step/menu/MenuContents";
import { saveAs } from "file-saver";
import Link from "next/link";
import { useDispatch } from "react-redux";
import {
  selectPackage,
  selectSize,
  makeFlowerList,
  selectWrapperColor,
  selectRibbonColor,
} from "@/store/reducers/custom";

const CustomSave = () => {
  const cx = classNames.bind(styles);
  const dispatch = useDispatch();
  const customOption = useSelector((state) => state.custom);

  //* 유저가 선택한 패키지 종류
  const packageKind = packageContent.engtitle[customOption.package];

  //* 포장지 색
  let packageColor = "#dfd4b9";
  customOption.wrapper_color === null
    ? (packageColor = "#ffffff")
    : customOption.wrapper_color
    ? (packageColor = wrapper[customOption.wrapper_color].hex)
    : (packageColor = wrapper[customOption.wrapper_color].hex);

  //* 유저가 선택한 리본 종류
  const ribbonOption = customOption.ribbon_color;

  //* 송이 종류
  const bunchList = ["1", "3", "5", "7", "9"];

  //* 사진 저장 버튼
  const onDownloadButton = () => {
    const capture = document.querySelector("#capture");
    html2canvas(capture).then((canvas) => {
      saveAs(canvas.toDataURL("image/jpg"), "image.jpg");
    });
  };

  //* 모든 값 초기화
  const sizeHandler = () => {
    dispatch(selectPackage(null));
    dispatch(selectSize(null));
    dispatch(makeFlowerList(null));
    dispatch(selectWrapperColor(null));
    dispatch(selectRibbonColor(null));
  };

  return (
    <main className={styles.save_background}>
      <section className={styles.card__wrapper}>
        <div className={styles.flower__img}>
          <div
            className={cx("custom_place", packageKind)}
            style={{
              backgroundColor: packageColor,
            }}
            id="capture"
          >
            <div
              className={styles.ribbon_cover}
              style={{
                backgroundImage: `url('/custom/ribbon/${ribbonOption}.png')`,
              }}
            >
              <CustomPlace />
            </div>
          </div>
        </div>
        <article className={styles.main__div__wrapper}>
          <div className={styles.sub__div__wrapper}>
            <h1 className={styles.main__p}>
              {bunchList[customOption.size]}송이 {packageContent.title[customOption.package]}
            </h1>
            <p className={styles.sub__p}>
              {packageContent.title[customOption.package]} | {ribbon[ribbonOption].name}
            </p>
            <p className={styles.line}></p>
            <p className={styles.description}>
              {customOption.flowers.map((flowerNumber, index) => (
                <p key={index}>{flower[flowerNumber].title}</p>
              ))}
            </p>
          </div>
          <div className={styles.btn__group}>
            <button className={styles.btn} onClick={() => onDownloadButton()}>
              사진으로 저장하기
            </button>
            <button className={styles.btn}>
              <Link href="/">메인으로 돌아가기</Link>
            </button>
            {/* <button className={styles.btn}>주문하러 가기</button>
            <button className={styles.btn}>내 디자인 보러가기</button>
            <button className={styles.btn}>카카오톡 공유하기</button> */}
          </div>
        </article>
      </section>
    </main>
  );
};

export default CustomSave;
