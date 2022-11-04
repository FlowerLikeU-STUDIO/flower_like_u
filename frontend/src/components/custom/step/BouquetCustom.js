import styles from "./BouquetCustom.module.scss";
import Link from "next/link";
import { selectPackage, selectSize } from "@/store/reducers/custom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { SizeContent } from "./StepContents";
import CustomMenu from "./menu/CustomMenu";

const BuoquetCustom = () => {
  const dispatch = useDispatch();
  const customOption = useSelector((state) => state.custom);

  const bouquetHandler = () => {
    dispatch(selectPackage(null));
    dispatch(selectSize(null));
  };

  (function dragndrop() {
    let xpos = "";
    let ypos = "";
    let whichArt = "";

    function resetZ() {
      const imgEl = document.querySelectorAll("img");
      for (let i = imgEl.length - 1; i >= 0; i--) {
        imgEl[i].style.zIndex = 5;
      }
    }

    function moveStart(e) {
      whichArt = e.target;
      xpos = e.offsetX === undefined ? e.layerX : e.offsetX;
      ypos = e.offsetY === undefined ? e.layerY : e.offsetY;
      whichArt.style.zIndex = 10;
    }

    function moveDragOver(e) {
      e.preventDefault();
    }

    function moveDrop(e) {
      e.preventDefault();
      whichArt.style.left = e.pageX - xpos + "px";
      whichArt.style.top = e.pageY - ypos + "px";
    }

    function touchStart(e) {
      e.preventDefault();
      const whichArt = e.target;
      const touch = e.touches[0];
      let moveOffsetX = whichArt.offsetLeft - touch.pageX;
      let moveOffsetY = whichArt.offsetTop - touch.pageY;
      resetZ();
      whichArt.style.zIndex = 10;

      whichArt.addEventListener(
        "touchmove",
        function () {
          let posX = touch.pageX + moveOffsetX;
          let posY = touch.pageY + moveOffsetY;
          whichArt.style.left = posX + "px";
          whichArt.style.top = posY + "px";
        },
        false
      );
    }

    document
      .querySelector("body")
      .addEventListener("dragstart", moveStart, false);
    document
      .querySelector("body")
      .addEventListener("dragover", moveDragOver, false);
    document.querySelector("body").addEventListener("drop", moveDrop, false);

    document
      .querySelector("body")
      .addEventListener("touchstart", touchStart, false);
  })();

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
          <div className={styles.circle_1} />
          <div className={styles.circle_2} />
          <div className={styles.circle_3} />
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
