import { useSelector } from "react-redux";
import styles from "./SmallModal.module.scss";

const SmallModal = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content__wrapper}>{children}</div>
    </div>
  );
};
export default SmallModal;
