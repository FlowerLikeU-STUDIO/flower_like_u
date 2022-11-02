import Image from "next/image";
import styles from "./MenuCard.module.scss";

//* img, title, contents
const MenuCard = (props) => {
  return (
    <div className={styles.menu_card_wrapper}>
      <Image
        src={props.img}
        className={styles.menu_image}
        width={88}
        height={88}
        draggable="true"
      ></Image>
      <div className={styles.letter_wrapper}>
        <h1 className={styles.menu_title}>{props.title}</h1>
        <span className={styles.menu_contents}>{props.contents}</span>
      </div>
    </div>
  );
};

export default MenuCard;
