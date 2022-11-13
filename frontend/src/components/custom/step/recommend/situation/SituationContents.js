import styles from "./SituationContents.module.scss";

const SituationContents = ({ setModalOpen }) => {
  //* 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <article className={styles.contents_wrapper}>
      <h1 className={styles.title}>너를 닮은 꽃 레시피</h1>
      <h4>
        아직 컨텐츠 준비중에 있답니다! <br />
        금방 좋은 컨텐츠로 찾아올게요 😘{" "}
      </h4>
    </article>
  );
};

export default SituationContents;
