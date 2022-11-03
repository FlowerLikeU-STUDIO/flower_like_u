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

  //* 사이즈 값을 변경하는 함수
  //* store의 flowers에 리스트 생성
  let list = [
    {
      name: null,
    },
  ];
  const sizeHandler = (index) => {
    dispatch(selectSize(index));
    // console.log(tmp);
    if (index === 0) {
      dispatch(makeFlowerList(list));
    } else {
      for (var i = 1; i < index * 2 + 1; i++) {
        list.push({ name: null });
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
