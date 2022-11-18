import styles from "./OptionCard.module.scss";
import classNames from "classnames/bind";
import FlowerImg from "@/components/common/FlowerImg";

//* 커스텀 페이지에서 종류를 고를 때 사용하는 카드입니다.
//* props로 size(small, medium), img, title, content, handler 값을 받습니다.
const OptionCard = (props) => {
  const cx = classNames.bind(styles);
  return (
    <article className={cx("custom_div", props.size)} onClick={props.handler}>
      <div className={styles.img_wrapper}>
        <FlowerImg src={props.img} className={styles.custom_img} />
      </div>
      <div className={styles.contents_wrapper}>
        <h1>{props.title}</h1>
        <div className={styles.card_line}></div>
        <span>{props.content}</span>
      </div>
    </article>
  );
};

export default OptionCard;
