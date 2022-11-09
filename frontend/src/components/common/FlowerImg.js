import Image from "next/image";
import styles from "./FlowerImg.module.scss";

// !상위에서 div로 스타일 주면 auto fit됨 (ex - width: 10rem)
const FlowerImg = ({ ...props }) => {
  return (
    <div className={styles.auto_height_imagewrapper}>
      <Image
        layout="fill"
        className={styles.auto_image}
        src={props.src || "/auth/flowerNone.png"}
        alt={props.alt || "너닮꽃 이미지"}
        priority={props.alt === "너닯꽃 bouquet" ? true : false}
      />
    </div>
  );
};

export default FlowerImg;
