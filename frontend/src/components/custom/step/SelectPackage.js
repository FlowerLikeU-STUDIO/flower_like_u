import OptionCard from "../common/OptionCard";
import styles from "./SelectPackage.module.scss";
import { packageContent } from "./StepContents";

const SelectPackage = () => {
  return (
    <div className={styles.package_wrapper}>
      {packageContent.title.map((title, index) => (
        <OptionCard
          size="medium"
          img="/home/centerFlower.png"
          title={title}
          content={packageContent.contents[index]}
          route={`size/${index}`}
        />
      ))}
    </div>
  );
};

export default SelectPackage;
