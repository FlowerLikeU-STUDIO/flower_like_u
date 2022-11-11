import styles from "./BouquetCustom.module.scss";
import Link from "next/link";
import { useSelector } from "react-redux";
import { SizeContent, packageContent } from "./StepContents";
import CustomMenu from "./menu/CustomMenu";
import classNames from "classnames/bind";
import CustomPlace from "./customplace/CustomPlace";
import InitialButton from "../common/InitialButton";
import html2canvas from "html2canvas";
import RandomFlower from "./recommend/RandomFlower";
import { wrapper } from "./menu/MenuContents";
import FailAlert from "@/lib/FailAlert";
import { mutate } from "swr";
import { client } from "@/pages/api/client";
import useSWR from "swr";
import storage from "@/lib/utils/storage";

const BuoquetCustom = () => {
  const cx = classNames.bind(styles);
  const { data: isLogin } = useSWR("logIn", storage);
  const customOption = useSelector((state) => state.custom);
  //* 유저가 선택한 패키지 종류
  const packageKind = packageContent.engtitle[customOption.package];

  //* 유저가 포장지를 선택할 때 색상을 변경해 주는 로직
  //* 기본값은 #ffffff이다.
  let packageColor = "#dfd4b9";
  customOption.wrapper_color === null
    ? (packageColor = "#ffffff")
    : customOption.wrapper_color
    ? (packageColor = wrapper[customOption.wrapper_color].hex)
    : (packageColor = wrapper[customOption.wrapper_color].hex);

  //* 유저가 선택한 리본 종류
  const ribbonOption = customOption.ribbon_color;

  //* 완성해서 서버에 이미지랑 데이터 보내기
  const onSaveCustomInfo = () => {
    const capture = document.querySelector("#capture");
    html2canvas(capture).then((canvas) => {
      let myImg = canvas.toDataURL("image/png");
      saveCustom(myImg);
    });
  };
  const saveCustom = async (myImg) => {
    //* 사이즈 정보
    let sizeList = [];
    customOption.package === 0 ? (sizeList = ["XS", "S", "M", "L", "XL"]) : (sizeList = ["S", "M", "L"]);

    //* 꽃 정보
    const flowers = customOption.flowers;
    let flowers_data = [];
    for (let i = 0; i < flowers.length; i++) {
      flowers_data.push(flowers[i] + 1);
    }

    //* 옵션을 고르지 않았을 때 alert 발생
    if (customOption.package === 0 && customOption.wrapper_color === null) {
      FailAlert("포장지 색을 골라주세요!");
      return;
    }
    if (customOption.package === 2 && customOption.wrapper_color === null) {
      FailAlert("포장지 색을 골라주세요!");
      return;
    } else if (customOption.package === 0 && customOption.ribbon_color === null) {
      FailAlert("리본 색을 골라주세요!");
      return;
    }

    //* 포장지, 리본 정보
    let wrapperId = null;
    let ribbonId = null;
    if (customOption.package === 0) {
      wrapperId = customOption.wrapper_color + 1;
      ribbonId = customOption.ribbon_color + 1;
    } else if (customOption.package === 2) {
      wrapperId = customOption.wrapper_color + 1;
    }

    const data = {
      type: packageContent.engtitle[customOption.package],
      image: myImg,
      wrapperId: wrapperId,
      ribbonId: ribbonId,
      size: sizeList[customOption.size],
      flowers: flowers_data,
    };

    const res = await client.post("custom", data).then((res) => res.data);
    if (res.result === "success") {
      alert("저장 성공!");
      mutate();
    } else {
      alert("실패");
    }
  };

  return (
    <>
      <main className={styles.custom_wrapper}>
        <aside className={styles.recommend_wrapper}>
          <RandomFlower />
          {/* <div className={styles.recommend_menu}>추천</div> */}
          <InitialButton />
        </aside>
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
        <div className={styles.custom_info_wrapper}>
          <p className={styles.custom_info_package}>{SizeContent[customOption.package].kotitle} 커스텀</p>
          <p className={styles.custom_info_size}>{SizeContent[customOption.package].title[customOption.size]} 사이즈</p>
          <button className={styles.go_save_page}>
            <Link href="/custom/save">
              <div onClick={isLogin ? () => onSaveCustomInfo() : () => console.log("완성")}>완성!</div>
            </Link>
          </button>
        </div>
        <CustomMenu />
      </main>
    </>
  );
};

export default BuoquetCustom;
