import styles from "./step.module.scss";
import CustomHeader from "@/components/custom/common/CustomHeader";
import SelectPackage from "@/components/custom/step/SelectPackage";
import SelectSize from "@/components/custom/step/SelectSize";
import BuoquetCustom from "@/components/custom/step/BouquetCustom";
import { useSelector } from "react-redux";

const Step = () => {
  const stepState = useSelector((state) => state.custom);
  return (
    <>
      <CustomHeader />
      <main className={styles.step_background}>
        {stepState.package === null ? <SelectPackage /> : stepState.size === null ? <SelectSize /> : <BuoquetCustom />}
      </main>
    </>
  );
};

export default Step;
