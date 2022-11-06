import styles from "./CustomHeader.module.scss";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import {
  selectPackage,
  selectSize,
  selectWrapperColor,
  selectRibbonColor,
} from "@/store/reducers/custom";
import FailAlert from "@/lib/FailAlert";
import findStep from "@/lib/utils/findStep";

const CustomHeader = (props) => {
  const dispatch = useDispatch();
  const cx = classNames.bind(styles);
  const stepState = props.stepState;
  //* 현재 단계 가져오기
  const step = findStep();

  //* 패키지와 사이즈 및 포장지/리본 값을 모두 null로 초기화
  const packageHandler = () => {
    dispatch(selectPackage(null));
    dispatch(selectSize(null));
    dispatch(selectWrapperColor(null));
    dispatch(selectRibbonColor(null));
  };

  //* 사이즈 및 포장지/리본 값을 null로 초기화
  const sizeHandler = () => {
    dispatch(selectSize(null));
    dispatch(selectWrapperColor(null));
    dispatch(selectRibbonColor(null));
    if (stepState.package === null) {
      FailAlert("포장방법을 골라주세요!");
    }
  };

  //* alert
  const flowerHandler = () => {
    if (stepState.package === null) {
      FailAlert("포장방법을 골라주세요!");
    } else if (stepState.size === null) {
      FailAlert("사이즈를 골라주세요!");
    }
  };

  return (
    <nav className={styles.custom_header_wrapper}>
      <div className={styles.step_wrapper}>
        <div
          className={
            step === "package"
              ? cx("number_title_wrapper", "active")
              : styles.number_title_wrapper
          }
          onClick={() => packageHandler()}
        >
          <div>1</div>
          <p>포장방법 선택하기</p>
        </div>
        <div className={styles.step_line} />
        <div
          className={
            step === "size"
              ? cx("number_title_wrapper", "active")
              : styles.number_title_wrapper
          }
          onClick={() => sizeHandler()}
        >
          <div>2</div>
          <p>사이즈 선택하기</p>
        </div>
        <div className={styles.step_line} />
        <div
          className={
            step === "custom"
              ? cx("number_title_wrapper", "active")
              : styles.number_title_wrapper
          }
          onClick={() => flowerHandler()}
        >
          <div>3</div>
          <p>꽃다발 커스텀</p>
        </div>
      </div>
    </nav>
  );
};

export default CustomHeader;
