import styles from "./SelectSize.module.scss";
import OptionCard from "../common/OptionCard";
import { SizeContent } from "./StepContents";
import { useDispatch, useSelector } from "react-redux";
import { selectSize, makeFlowerList } from "@/store/reducers/custom";

const SelectSize = () => {
  const dispatch = useDispatch();

  //* 패키지 타입에 따라서 사이즈 옵션이 다르다.
  const stepState = useSelector((state) => state.custom);
  const packageType = stepState.package;
  const contents = SizeContent[packageType];

  //* store의 사이즈 값을 변경하는 함수
  //* store의 flowers에 꽃 개수 길이만큼의 리스트를 생성해서 넣어줍니다.
  let list = [0];
  const sizeHandler = (index) => {
    dispatch(selectSize(index));
    if (index === 0) {
      dispatch(makeFlowerList(list));
    } else {
      for (let i = 1; i < index * 2 + 1; i++) {
        list.push(0);
      }
      dispatch(makeFlowerList(list));
    }
  };

  return (
    <div className={styles.size_wrapper}>
      {contents.title.map((title, index) => (
        <OptionCard
          key={title}
          size="small"
          img={`/custom/${contents.engtitle}/${index}.png`}
          title={title}
          content={contents.contents[index]}
          handler={() => sizeHandler(index)}
        />
      ))}
    </div>
  );
};

export default SelectSize;
