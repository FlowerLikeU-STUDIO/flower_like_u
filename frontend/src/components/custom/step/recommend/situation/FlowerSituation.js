import styles from "./FlowerSituation.module.scss";
import SituationModal from "./SituationModal";
import { useState } from "react";

const FlowerSituation = () => {
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
      {modalOpen && <SituationModal setModalOpen={setModalOpen} />}
    </div>
  );
};

export default FlowerSituation;
