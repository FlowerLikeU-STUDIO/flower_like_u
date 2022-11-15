import { useRouter } from "next/router";
import styles from "./CustomDetailCard.module.scss";
import FlowerImg from "./FlowerImg";
import useDesign from "@/hooks/useDesign";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
// 사진 저장, 카카오톡 공유하기
import { saveAs } from "file-saver";
import useKakao from "@/hooks/useKakao";
// 주문하기 modal
import { useSelector, useDispatch } from "react-redux";
import Modal from "@/components/modal";
import { modalOpen } from "@/store/reducers/modal";
import CustomOrder from "@/components/modal/contents/CustomOrder";

const CustomDetailCard = () => {
  const router = useRouter();
  const cx = classNames.bind(styles);

  //* 커스텀 꽃다발 데이터 가져오기
  const { designDetail } = useDesign();
  const [path, setPath] = useState(router.query.did);
  const { basics, details } = designDetail({ flowerId: path || router.query.did });
  useEffect(() => {
    if (router.query.did) {
      setPath(router.query.did);
    }
  }, [path]);
  useEffect(() => {}, [basics]);

  //* 송이 종류
  const bunchList = { XS: 1, S: 3, M: 5, L: 7, XL: 9 };

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

  //* 사진 저장
  const onDownloadButton = () => {
    const capture = document.querySelector("#capture");
    html2canvas(capture).then((canvas) => {
      saveAs(canvas.toDataURL("image/jpg"), "image.jpg");
    });
  };

  //* 주문하기 모달
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);
  const onHandleOpen = () => {
    dispatch(modalOpen());
  };

  return (
    <div className={styles.card__wrapper} id="capture">
      {basics && (
        <>
          {isOpen ? (
            <>
              <Modal children={<CustomOrder orderStep={"florist"} />} />
            </>
          ) : (
            <></>
          )}
          <div className={styles.flower__img} id="kakao_image">
            <FlowerImg src={basics.image} />
          </div>
          <div className={styles.main__div__wrapper}>
            <div className={styles.sub__div__wrapper}>
              <h1 className={styles.main__p}>
                {bunchList[details.size]}송이 {details.type}
              </h1>
              <p className={styles.sub__p}>
                {details.wrapper} | {details.ribbon}
              </p>
              <p className={styles.line}></p>
              {details.flowers.map((flower, index) => (
                <p className={styles.description} key={index}>
                  {flower}
                </p>
              ))}
            </div>
            <div className={styles.btn__group}>
              <button className={styles.btn} onClick={() => onShareKakao()}>
                카카오톡 공유하기
              </button>
              <button className={styles.btn} onClick={() => onDownloadButton()}>
                사진으로 저장하기
              </button>
              <button className={cx("btn", "green")} onClick={() => onHandleOpen()}>
                주문하러 가기
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomDetailCard;
