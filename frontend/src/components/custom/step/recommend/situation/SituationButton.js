import styles from "./SituationButton.module.scss";
import { useState } from "react";
import CustomModal from "@/components/custom/common/CustomModal";

const SituationButton = () => {
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div>
      <button className={styles.recommend_menu} onClick={showModal}>
        레시피
      </button>
      {modalOpen && <CustomModal setModalOpen={setModalOpen} id={2} />}
    </div>
  );
};

export default SituationButton;
