import styles from "./SelectSize.module.scss";
import OptionCard from "../common/OptionCard";
import { SizeContent } from "./StepContents";

const SelectSize = (props) => {
  const packageType = props.package;
  const contents = SizeContent[packageType];
  return (
    <div className={styles.size_wrapper}>
      {contents.title.map((title, index) => (
        <OptionCard
          size="small"
          img="/home/centerFlower.png"
          title={title}
          content={contents.contents[index]}
          route={`bouquet/${packageType}/${index}`}
        />
      ))}
    </div>
  );
};

export default SelectSize;
