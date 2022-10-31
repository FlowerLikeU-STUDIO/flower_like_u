import styles from "./MyWrapper.module.scss";

const MyWrapper = ({ children }) => {
  return <div className={styles.layout}>{children}</div>;
};

export default MyWrapper;
