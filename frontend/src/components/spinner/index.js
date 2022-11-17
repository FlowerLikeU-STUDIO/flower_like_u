import styles from "./spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styles.lds_spinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
