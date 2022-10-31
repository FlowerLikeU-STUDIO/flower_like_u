import OptionCard from "../common/OptionCard";
import styles from "./SelectPackage.module.scss";
import { packageContent } from "./StepContents";
import { useDispatch } from "react-redux";
import { selectPackage } from "@/store/reducers/custom";

const SelectPackage = () => {
  const dispatch = useDispatch();
  const packageHandler = (index) => {
    dispatch(selectPackage(index));
  };

  return (
    <div className={styles.package_wrapper}>
      {packageContent.title.map((title, index) => (
        <OptionCard
          key={title}
          size="medium"
          img="/home/centerFlower.png"
          title={title}
          content={packageContent.contents[index]}
          handler={() => packageHandler(index)}
        />
      ))}
    </div>
  );
};

export default SelectPackage;
