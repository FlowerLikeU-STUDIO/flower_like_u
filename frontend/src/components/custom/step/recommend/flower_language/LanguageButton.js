import styles from "./LanguageButton.module.scss";
import { useState } from "react";
import CustomModal from "@/components/custom/common/CustomModal";

const LanguageButton = () => {
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
      {modalOpen && <CustomModal setModalOpen={setModalOpen} id={1} />}
    </div>
  );
};

export default LanguageButton;
