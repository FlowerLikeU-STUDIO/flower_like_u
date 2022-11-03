import Image from "next/image";
import styles from "./MenuCard.module.scss";

//* img, title, contents
const MenuCard = (props) => {
  // 드래그 앤 드롭
  const onDragEnd = (e) => {
    if (props.enter === 1) {
      console.log("잘했어!");
    } else if (props.enter === 0) {
      console.log("다른 데 놓았어!");
    }
  };

  return (
    <div className={styles.menu_card_wrapper}>
      <Image
        src={props.img}
        className={styles.menu_image}
        width={88}
        height={88}
        draggable={true}
        data-position={props.title}
        onDragEnd={onDragEnd}
      ></Image>
      <div className={styles.letter_wrapper}>
        <h1 className={styles.menu_title}>{props.title}</h1>
        <span className={styles.menu_contents}>{props.contents}</span>
      </div>
    </div>
  );
};

export default MenuCard;
