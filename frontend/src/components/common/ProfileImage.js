import styles from "./ProfileImage.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import React from "react";

//* props로 이미지의 url과 size(extra_small, small, medium, large, extra_large)를 넘겨서 사용

const areEqual = (prevProps, nextProps) => {
  prevProps.url === nextProps.url ? true : false;
};
const ProfileImage = (props) => {
  const cx = classNames.bind(styles);
  return (
    <div>
      <div className={cx("img_container", props.size, props?.isModify)}>
        <Image
          src={props.url ? props.url : "/auth/profileDefault.png"}
          className={styles.profile_img}
          width={360}
          height={360}
          alt="profileImg"
        />
      </div>
    </div>
  );
};

export default React.memo(ProfileImage, areEqual);
