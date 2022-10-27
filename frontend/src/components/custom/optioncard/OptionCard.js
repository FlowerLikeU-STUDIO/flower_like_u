import styles from "./OptionCard.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";

//* 커스텀 페이지에서 종류를 고를 때 사용하는 카드입니다.
//* props로 size(small, medium), img, title, content 값을 받습니다.
const OptionCard = (props) => {
  const cx = classNames.bind(styles);
  return (
    <div className={cx("custom_div", props.size)}>
      <Image src={props.img} className={styles.custom_img} width={180} height={180} />
      <p>{props.title}</p>
      <div className={styles.card_line}></div>
      <span>{props.content}</span>
    </div>
  );
};

export default OptionCard;
