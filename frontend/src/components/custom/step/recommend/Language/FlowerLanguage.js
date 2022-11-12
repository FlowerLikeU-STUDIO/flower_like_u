import styles from "./FlowerLanguage.module.scss";
import { useState } from "react";
import LanguageModal from "./LanguageModal";

const FlowerLanguage = () => {
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div>
      <button className={styles.recommend_menu} onClick={showModal}>
        꽃말
      </button>
      {modalOpen && <LanguageModal setModalOpen={setModalOpen} />}
    </div>
  );
};

export default FlowerLanguage;
