import styles from "./step.module.scss";
import CustomHeader from "@/components/custom/common/CustomHeader";
import SelectPackage from "@/components/custom/step/SelectPackage";
import SelectSize from "@/components/custom/step/SelectSize";
import BuoquetCustom from "@/components/custom/step/BouquetCustom";
import CustomBackButton from "@/components/custom/common/CustomBackButton";
import { useSelector } from "react-redux";

const Step = () => {
  const stepState = useSelector((state) => state.custom);
  return (
    <>
      <main className={styles.step_background}>
        <CustomHeader stepState={stepState} />
        <section className={styles.step_content}>
          {stepState.package === null ? (
            <div className={styles.card_button_wrapper}>
              <SelectPackage />
              <CustomBackButton />
            </div>
          ) : stepState.size === null ? (
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
