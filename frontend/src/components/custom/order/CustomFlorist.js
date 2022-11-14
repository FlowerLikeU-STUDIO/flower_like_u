import styles from "./CustomFlorist.module.scss";
import { modalClose } from "@/store/reducers/modal";
import { useDispatch } from "react-redux";

const CustomFlorist = ({ setStep }) => {
  const dispatch = useDispatch();

  const goReservation = () => {
    setStep("reservation");
  };

  const closeModal = () => {
    dispatch(modalClose());
  };

  return (
    <section className={styles.container}>
      <div className={styles.button_wrapper}>
        <button className={styles.close} onClick={closeModal}>
          <span className="material-icons-outlined">close</span>
        </button>
      </div>
      <article className={styles.contents_wrapper}>
        <h1>커스텀 플로리스트 목록 모달 컨텐츠</h1>
        <div className={styles.florist_wrapper}>여기에 플로리스트 목록이 들어와요</div>
      </article>

      <button onClick={goReservation}>예약으로 넘어가기</button>
    </section>
  );
};

export default CustomFlorist;
