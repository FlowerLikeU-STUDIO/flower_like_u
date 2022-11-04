import styles from "./step.module.scss";
import CustomHeader from "@/components/custom/common/CustomHeader";
import SelectPackage from "@/components/custom/step/SelectPackage";
import SelectSize from "@/components/custom/step/SelectSize";
import BuoquetCustom from "@/components/custom/step/BouquetCustom";
import CustomBackButton from "@/components/custom/common/CustomBackButton";
import { useSelector } from "react-redux";
import findStep from "@/lib/utils/findStep";
import classNames from "classnames/bind";

const Step = () => {
  const cx = classNames.bind(styles);
  const stepState = useSelector((state) => state.custom);

  //* 현재 단계 가져오기
  const step = findStep();

  return (
    <>
      <main
        className={
          step === "custom"
            ? cx("step_background", "white100")
            : styles.step_background
        }
      >
        <CustomHeader stepState={stepState} />
        <section className={styles.step_content}>
          {step === "package" ? (
            <div className={styles.card_button_wrapper}>
              <SelectPackage />
              <CustomBackButton />
            </div>
          ) : step === "size" ? (
            <div className={styles.card_button_wrapper}>
              <SelectSize />
              <CustomBackButton />
            </div>
          ) : (
            <BuoquetCustom />
          )}
        </section>
      </main>
    </>
  );
};

export default Step;
