import Image from "next/image";
import styles from "./PackageMenuCard.module.scss";

//* img, title, contents
const PackageMenuCard = (props) => {
  return (
    <div className={styles.menu_card_wrapper}>
      <Image src={props.img} className={styles.menu_image} width={88} height={88}></Image>
      <div className={styles.letter_wrapper}>
        <h1 className={styles.menu_title}>{props.title}</h1>
        <span className={styles.menu_contents}>{props.contents}</span>
      </div>
    </div>
  );
};

export default PackageMenuCard;
