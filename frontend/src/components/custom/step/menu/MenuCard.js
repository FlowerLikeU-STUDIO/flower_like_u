import Image from "next/image";
import styles from "./MenuCard.module.scss";

//* img, title, contents
const MenuCard = (props) => {
  return (
    <div className={styles.menu_card_wrapper}>
      <Image src={props.img} className={styles.menu_image} width={88} height={88}></Image>
      <div className={styles.letter_wrapper}>
        <div>{props.title}</div>
        <div>{props.contents}</div>
      </div>
    </div>
  );
};

export default MenuCard;
