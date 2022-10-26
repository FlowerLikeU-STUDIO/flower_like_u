import styles from "./ProfileImage.module.scss";
import classNames from "classnames/bind";

const ProfileImage = (props) => {
  const cx = classNames.bind(styles);
  return (
    <div className={cx("img_container", props.size)}>
      <img src={props.url} className={styles.profile_img} />
    </div>
  );
};

export default ProfileImage;
