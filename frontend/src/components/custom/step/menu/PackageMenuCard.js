import styles from "./PackageMenuCard.module.scss";
import { selectWrapperColor } from "@/store/reducers/custom";
import { useDispatch } from "react-redux";

const PackageMenuCard = (props) => {
  const dispatch = useDispatch();

  //* 포장지 색깔을 변경하는 함수
  const wrapperColorHandler = () => {
    dispatch(selectWrapperColor(props.hex));
  };

  return (
    <div
      className={styles.menu_card_wrapper}
      onClick={() => wrapperColorHandler()}
    >
      <div
        className={styles.color_circle}
        style={{
          backgroundColor: `${props.hex}`,
        }}
      />
      <div className={styles.letter_wrapper}>
        <h1 className={styles.menu_title}>{props.title}</h1>
        <span className={styles.menu_contents}>{props.contents}</span>
      </div>
    </div>
  );
};

export default PackageMenuCard;
