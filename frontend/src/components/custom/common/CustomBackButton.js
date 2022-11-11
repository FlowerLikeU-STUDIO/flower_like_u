import { useDispatch } from "react-redux";
import { selectPackage } from "@/store/reducers/custom";
import { useRouter } from "next/router";
import styles from "./CustomBackButton.module.scss";
import findStep from "@/lib/utils/findStep";

const CustomBackButton = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  //* 현재 단계 가져오기
  const step = findStep();

  //* 패키지 값을 다시 null로 초기화 후 router.push
  const packageHandler = () => {
    dispatch(selectPackage(null));
    router.push("/custom");
  };

  //* 패키지 값을 다시 null로 초기화
  const sizeHandler = () => {
    dispatch(selectPackage(null));
  };

  return (
    <>
      {step === "package" ? (
        <div className={styles.custom_backbutton} onClick={() => packageHandler()}>
          <button className="material-icons-outlined">arrow_back</button>
        </div>
      ) : step === "size" ? (
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
