import OptionCard from "../common/OptionCard";
import styles from "./SelectPackage.module.scss";
import { packageContent } from "./StepContents";
import { useDispatch } from "react-redux";
import { selectPackage } from "@/store/reducers/custom";

const SelectPackage = () => {
  const dispatch = useDispatch();

  //* 패키지 종류를 변경하는 함수
  const packageHandler = (index) => {
    dispatch(selectPackage(index));
  };

  return (
    <div className={styles.package_wrapper}>
      {packageContent.title.map((title, index) => (
        <OptionCard
          key={title}
          size="medium"
          img={`/custom/${packageContent.engtitle[index]}/2.png`}
          title={title}
          content={packageContent.contents[index]}
          handler={() => packageHandler(index)}
        />
      ))}
    </div>
  );
};

export default SelectPackage;
