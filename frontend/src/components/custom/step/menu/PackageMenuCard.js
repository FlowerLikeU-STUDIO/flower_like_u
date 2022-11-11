import styles from "./PackageMenuCard.module.scss";
import { selectWrapperColor, selectRibbonColor } from "@/store/reducers/custom";
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";
import { wrapper } from "./MenuContents";

const PackageMenuCard = (props) => {
  const dispatch = useDispatch();
  const cx = classNames.bind(styles);

  //* 포장지 색깔을 변경하는 함수
  const wrapperColorHandler = () => {
    dispatch(selectWrapperColor(props.index));
  };

  //* 리본을 변경하는 함수
  const ribbonHandler = () => {
    dispatch(selectRibbonColor(props.index));
  };

  return (
    <div
      className={styles.menu_card_wrapper}
      onClick={props.tab === 1 ? () => wrapperColorHandler() : () => ribbonHandler()}
    >
      <div
        className={props.tab === 1 ? cx("color_circle", "package") : cx("color_circle", "ribbon")}
        style={
          props.tab === 1
            ? {
                backgroundColor: `${wrapper[props.index].hex}`,
              }
            : {
                backgroundImage: `url('/custom/ribbon/${props.index}.png')`,
              }
        }
      />
      <div className={styles.letter_wrapper}>
        <h1 className={styles.menu_title}>{props.name}</h1>
        <span className={styles.menu_contents}>{props.description}</span>
      </div>
    </div>
  );
};

export default PackageMenuCard;
