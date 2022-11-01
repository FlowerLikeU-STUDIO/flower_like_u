import styles from "./SelectSize.module.scss";
import OptionCard from "../common/OptionCard";
import { SizeContent } from "./StepContents";
import { useDispatch } from "react-redux";
import { selectSize } from "@/store/reducers/custom";
import { useSelector } from "react-redux";

const SelectSize = () => {
  const dispatch = useDispatch();

  //* 패키지 타입에 따라서 사이즈 옵션이 다르다.
  const stepState = useSelector((state) => state.custom);
  const packageType = stepState.package;
  const contents = SizeContent[packageType];

  //* 사이즈 값을 변경하는 함수
  const sizeHandler = (index) => {
    dispatch(selectSize(index));
  };

  return (
    <div className={styles.size_wrapper}>
      {contents.title.map((title, index) => (
        <OptionCard
          key={title}
          size="small"
          img="/home/centerFlower.png"
          title={title}
          content={contents.contents[index]}
          handler={() => sizeHandler(index)}
        />
      ))}
    </div>
  );
};

export default SelectSize;
