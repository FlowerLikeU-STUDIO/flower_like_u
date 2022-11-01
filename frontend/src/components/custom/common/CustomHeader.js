import styles from "./CustomHeader.module.scss";
import classNames from "classnames/bind";

const CustomHeader = (props) => {
  const cx = classNames.bind(styles);
  const stepState = props.stepState;

  return (
    <nav className={styles.custom_header_wrapper}>
      <div className={styles.step_wrapper}>
        <div
          className={
            !stepState.package && !stepState.size ? cx("number_title_wrapper", "active") : styles.number_title_wrapper
          }
        >
          <div>1</div>
          <p>포장방법 선택하기</p>
        </div>
        <div className={styles.step_line} />
        <div
          className={
            stepState.package && !stepState.size ? cx("number_title_wrapper", "active") : styles.number_title_wrapper
          }
        >
          <div>2</div>
          <p>사이즈 선택하기</p>
        </div>
        <div className={styles.step_line} />
        <div
          className={
            stepState.package && stepState.size ? cx("number_title_wrapper", "active") : styles.number_title_wrapper
          }
        >
          <div>3</div>
          <p>꽃다발 커스텀</p>
        </div>
      </div>
    </nav>
  );
};

export default CustomHeader;
