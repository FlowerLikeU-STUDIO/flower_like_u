import styles from "./save.module.scss";
import classNames from "classnames/bind";
import { useRouter } from "next/router";
import Script from "next/script";
// 컨텐츠
import { packageContent } from "@/components/custom/step/StepContents";
import CustomPlace from "@/components/custom/step/customplace/CustomPlace";
import {
  wrapper,
  ribbon,
  flower,
} from "@/components/custom/step/menu/MenuContents";
// 사진 저장, 카카오톡 공유하기
import { saveAs } from "file-saver";
import useKakao from "@/hooks/useKakao";
// redux
import { useSelector, useDispatch } from "react-redux";
import {
  selectPackage,
  selectSize,
  makeFlowerList,
  selectWrapperColor,
  selectRibbonColor,
} from "@/store/reducers/custom";
// 주문하기 modal
import Modal from "@/components/modal";
import { modalOpen } from "@/store/reducers/modal";
import CustomOrder from "@/components/modal/contents/CustomOrder";
// 로그인 여부
import useSWR from "swr";
import storage from "@/lib/utils/storage";
import FailAlert from "@/lib/FailAlert";

const CustomSave = () => {
  const cx = classNames.bind(styles);
  const dispatch = useDispatch();
  const customOption = useSelector((state) => state.custom);
  const router = useRouter();
  const { data: isLogin } = useSWR("logIn", storage);

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

  //* 사진 저장
  const onDownloadButton = () => {
    const capture = document.querySelector("#capture");
    html2canvas(capture).then((canvas) => {
      saveAs(canvas.toDataURL("image/jpg"), "image.jpg");
    });
  };

  //* 카카오톡 공유하기
  const { kakaoShare } = useKakao();
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  const onShareKakao = () => {
    const capture = document.querySelector("#kakao_image");
    html2canvas(capture).then((canvas) => {
      let myImg = canvas.toDataURL("image/jpg");
      let file = dataURLtoFile(myImg, "kakao.png");
      kakaoShare(file);
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

  //* 메인 페이지로 이동 전에 초기화되어서 에러가 발생하는 것을 방지
  const timer = () => setTimeout(() => sizeHandler(), 200);

  //* 꽃 이름 : 꽃 송이수 출력을 위한 로직
  let flowerInfo = {};
  if (customOption.flowers) {
    const copyOfFlowers = [...customOption.flowers];
    copyOfFlowers.map((flowerNumber, index) => {
      if (!flowerInfo[flowerNumber]) {
        flowerInfo[flowerNumber] = 1;
      } else if (flowerInfo[flowerNumber]) {
        flowerInfo[flowerNumber]++;
      }
    });
  }

  //* 주문하기 모달
  const isOpen = useSelector((state) => state.modal.isOpen);
  const onHandleOpen = () => {
    isLogin
      ? dispatch(modalOpen())
      : FailAlert("로그인한 유저만 주문할 수 있어요!");
  };

  //* 내 디자인 보러가기
  const goToMyDesign = () => {
    isLogin
      ? router.push("/mypage/design")
      : FailAlert("로그인이 필요한 기능이에요!");
  };

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.2/FileSaver.min.js"></Script>
      <Script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></Script>
      {isOpen ? (
        <>
          <Modal children={<CustomOrder orderStep={"florist"} />} />
        </>
      ) : (
        <></>
      )}
      <main className={styles.save_background}>
        <section className={styles.card__wrapper} id="capture">
          <div className={styles.flower__img} id="kakao_image">
            <div
              className={cx("custom_place", packageKind)}
              style={{
                backgroundColor: packageColor,
              }}
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
          <article className={styles.flower_contents_wrapper}>
            <div className={styles.contents_subwrapper}>
              <h1 className={styles.card_title}>
                {bunchList[customOption.size]}송이{" "}
                {packageContent.title[customOption.package]}
              </h1>
              {customOption.package === 0 ? (
                <p className={styles.sub_title}>
                  {wrapper[customOption.wrapper_color].name} |{" "}
                  {ribbon[ribbonOption].name}
                </p>
              ) : customOption.package === 2 ? (
                <p className={styles.sub_title}>
                  {wrapper[customOption.wrapper_color].name}
                </p>
              ) : (
                <></>
              )}
              <p className={styles.line}></p>
              <div className={styles.description_wrapper}>
                {Object.entries(flowerInfo).map(([key, value]) => (
                  <>
                    <span className={styles.description} key={key}>
                      {flower[Number(key)].title}&nbsp;&nbsp;
                      {value}송이
                    </span>
                  </>
                ))}
              </div>
            </div>
            <div className={styles.btn__group}>
              <button className={styles.btn} onClick={() => onDownloadButton()}>
                사진으로 저장하기
              </button>
              <button className={styles.btn} onClick={() => onShareKakao()}>
                카카오톡 공유하기
              </button>
              <button
                className={cx("btn", "green")}
                onClick={() => goToMyDesign()}
              >
                내 디자인 보러가기
              </button>
              <button
                className={styles.btn}
                onClick={() => {
                  router.push("/");
                  timer();
                }}
              >
                초기화하고 메인으로 돌아가기
              </button>
              {/* <button className={cx("btn", "green")} onClick={() => onHandleOpen()}>
                주문하러 가기
              </button> */}
            </div>
          </article>
        </section>
      </main>
    </>
  );
};

export default CustomSave;
