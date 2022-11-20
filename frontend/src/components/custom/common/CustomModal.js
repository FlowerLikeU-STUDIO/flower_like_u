import styles from "./CustomModal.module.scss";
import LanguageContents from "../step/recommend/flower_language/LanguageContents";
import SituationContents from "../step/recommend/situation/SituationContents";
import HowCustomize from "../HowCustomize";
import ColorContents from "../step/recommend/color/ColorContents";
import { useRef, useEffect } from "react";

const CustomModal = ({ setModalOpen, id }) => {
  //* 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  // 모달 외부 클릭시 끄기 처리
  // Modal 창을 useRef로 취득
  const modalRef = useRef(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (event) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <section className={styles.container} ref={modalRef}>
      <button className={styles.close} onClick={closeModal}>
        <span className="material-icons-outlined">close</span>
      </button>
      {id === 1 ? (
        <LanguageContents setModalOpen={setModalOpen} />
      ) : id === 2 ? (
        <SituationContents setModalOpen={setModalOpen} />
      ) : id === 3 ? (
        <HowCustomize />
      ) : (
        <ColorContents setModalOpen={setModalOpen} />
      )}
    </section>
  );
};

export default CustomModal;
