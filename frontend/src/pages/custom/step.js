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
      <CustomHeader />
      <main className={styles.step_background}>
        <CustomBackButton />
        {stepState.package === null ? (
          <SelectPackage />
        ) : stepState.size === null ? (
          <SelectSize />
        ) : (
          <BuoquetCustom />
        )}
        {/* <button className="material-icons-outlined">arrow_forward</button> */}
      </main>
    </>
  );
};

export default Step;
