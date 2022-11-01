import MyWrapper from "@/components/common/MyWrapper";
import ProfileImage from "@/components/common/ProfileImage";
import useMypage from "@/hooks/useMypage";
import styles from "./MySetting.module.scss";
import classnames from "classnames/bind";

const MyPageSettings = ({ children }) => {
  const cx = classnames.bind(styles);

  // *profile 정보 hook에서 불러오기
  const uid = "mypage-buyer";
  // const uid = "mypage-seller";
  const { data, type } = useMypage(uid);
  // console.log(data, type);
  // console.log(data);
  return (
    <MyWrapper>
      <div className={styles.main__div}>
        <div className={styles.header__flex}>
          <div className={styles.yellow__circle} />
          <ProfileImage url={data.profile} size="medium" isModify="modifyProfile" />
          <span className={cx("material-icons-outlined", "settings")}>settings</span>
        </div>
        <div className={styles.info__div}>{children}</div>
      </div>
    </MyWrapper>
  );
};

export default MyPageSettings;
