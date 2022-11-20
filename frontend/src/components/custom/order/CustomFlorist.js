import styles from "./CustomFlorist.module.scss";
import { modalClose } from "@/store/reducers/modal";
import { useDispatch } from "react-redux";
import CustomFloristList from "./CustomFloristList";

const CustomFlorist = ({ storeId, setStep, setStoreId }) => {
  const dispatch = useDispatch();

  const goReservation = () => {
    if (!storeId) {
      alert("가게를 선택해주세요");
      return;
    }
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
        <h1>플로리스트 목록 | 원하는 플로리스트로 예약해보세요</h1>
        <div className={styles.florist_wrapper}>
          <CustomFloristList setStoreId={setStoreId} storeId={storeId} />
        </div>
      </article>
      <button onClick={goReservation}>
        <span className="material-icons-outlined">arrow_forward</span>
      </button>
    </section>
  );
};

export default CustomFlorist;
