import styles from "./BouquetCustom.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
// 컨텐츠
import { SizeContent, packageContent } from "./StepContents";
import { wrapper } from "./menu/MenuContents";
// 컴포넌트
import CustomMenu from "./menu/CustomMenu";
import CustomPlace from "./customplace/CustomPlace";
import InitialButton from "../common/InitialButton";
import RandomFlower from "./recommend/RandomFlower";
import FailAlert from "@/lib/FailAlert";
import LanguageButton from "./recommend/flower_language/LanguageButton";
import SituationButton from "./recommend/situation/SituationButton";
import ColorButton from "./recommend/color/ColorButton";
import CustomModal from "../common/CustomModal";
// 로그인 여부
import useSWR from "swr";
import storage from "@/lib/utils/storage";
// 꽃다발 저장
import { mutate } from "swr";
import html2canvas from "html2canvas";
import { client } from "@/pages/api/client";

const BuoquetCustom = () => {
  const cx = classNames.bind(styles);
  const router = useRouter();
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

    //* 사이즈 정보
    let sizeList = [];
    customOption.package === 0 ? (sizeList = ["XS", "S", "M", "L", "XL"]) : (sizeList = ["S", "M", "L"]);

    //* 꽃 정보
    const flowers = customOption.flowers;
    let flowers_data = [];
    for (let i = 0; i < flowers.length; i++) {
      flowers_data.push(flowers[i] + 1);
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

    console.log(packageContent.engtitle[customOption.package]);

    const res = await client.post("custom", data).then((res) => res.data);
    if (res.result === "success") {
      mutate();
    }
    router.push("/custom/save");
  };

  const notUserSaveCustom = () => {
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
    router.push("/custom/save");
  };

  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <main className={styles.custom_wrapper}>
        <aside className={styles.recommend_wrapper}>
          <ColorButton />
          <SituationButton />
          <LanguageButton />
          <RandomFlower />
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
          <div className={styles.info_sub_wrapper}>
            <p className={styles.custom_info_size}>
              {SizeContent[customOption.package].title[customOption.size]} 사이즈
            </p>
            <p className={styles.custom_info_package}>{SizeContent[customOption.package].kotitle} 커스텀</p>
          </div>
          <div className={styles.info_sub_wrapper}>
            <button className={styles.go_save_page} onClick={showModal}>
              커스텀 방법
            </button>
            {modalOpen && <CustomModal setModalOpen={setModalOpen} id={3} />}
            <button
              className={styles.go_save_page}
              onClick={isLogin ? () => onSaveCustomInfo() : () => notUserSaveCustom()}
            >
              완성했어요!
            </button>
          </div>
        </div>
        <CustomMenu />
      </main>
    </>
  );
};

export default BuoquetCustom;
