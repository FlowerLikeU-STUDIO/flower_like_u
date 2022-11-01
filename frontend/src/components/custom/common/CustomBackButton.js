import { useDispatch, useSelector } from "react-redux";
import { selectPackage } from "@/store/reducers/custom";
import { useRouter } from "next/router";
import styles from "./CustomBackButton.module.scss";

const CustomBackButton = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  //* 패키지 값을 다시 null로 초기화 후 router.push
  const packageHandler = () => {
    dispatch(selectPackage(null));
    router.push("/custom");
  };

  //* 패키지 값을 다시 null로 초기화
  const sizeHandler = () => {
    dispatch(selectPackage(null));
  };

  //* 현재 state 값 확인
  const stepState = useSelector((state) => state.custom);

  return (
    <>
      {stepState.package === null ? (
        <div
          className={styles.custom_backbutton}
          onClick={() => packageHandler()}
        >
          <button className="material-icons-outlined">arrow_back</button>
        </div>
      ) : stepState.size === null ? (
        <div className={styles.custom_backbutton} onClick={() => sizeHandler()}>
          <button className="material-icons-outlined">arrow_back</button>
        </div>
      ) : (
        <div className={styles.invisible}>
          <button className="material-icons-outlined">arrow_back</button>
        </div>
      )}
    </>
  );
};

export default CustomBackButton;
