import styles from "./ProfileImage.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";

const ProfileImage = (props) => {
  const cx = classNames.bind(styles);
  return (
    <div className={cx("img_container", props.size)}>
      <Image src={props.url} className={styles.profile_img} width={360} height={360} />
    </div>
  );
};

export default ProfileImage;
