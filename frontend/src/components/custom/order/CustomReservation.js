import styles from "./CustomReservation.module.scss";
import { modalClose } from "@/store/reducers/modal";
import { useDispatch } from "react-redux";

const CustomReservation = ({ setStep }) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(modalClose());
  };

  const goReservation = () => {
    setStep("florist");
  };

  return (
    <section className={styles.container}>
      <div className={styles.button_wrapper}>
        <button className={styles.close} onClick={closeModal}>
          <span className="material-icons-outlined">close</span>
        </button>
      </div>
      <article className={styles.contents_wrapper}>
        <h1>커스텀 주문 예약 모달 컨텐츠</h1>
        <div className={styles.florist_wrapper}>여기에 주문 예약이 들어와요</div>
      </article>
      <button onClick={goReservation}>돌아가기</button>
    </section>
  );
};

export default CustomReservation;
