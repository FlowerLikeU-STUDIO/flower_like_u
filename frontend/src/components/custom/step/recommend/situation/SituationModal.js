import styles from "./SituationModal.module.scss";

const SituationModal = ({ setModalOpen }) => {
  //* 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className={styles.container}>
      <button className={styles.close} onClick={closeModal}>
        <span className="material-icons-outlined">close</span>
      </button>
      <article className={styles.contents_wrapper}>
        <h1 className={styles.title}>너를 닮은 꽃 레시피</h1>
        <h4>상황별로 사용하는 꽃을 추천해드려요!</h4>
      </article>
    </section>
  );
};

export default SituationModal;
