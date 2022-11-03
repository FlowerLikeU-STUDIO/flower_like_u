import MyWrapper from "@/components/common/MyWrapper";
import ProfileImage from "@/components/common/ProfileImage";
import useUser from "@/hooks/useUser";
import styles from "./MySetting.module.scss";
import classnames from "classnames/bind";

const MyPageSettings = ({ children }) => {
  const cx = classnames.bind(styles);

  const { user } = useUser("useruser1");
  // console.log(user);

  return (
    <>
      {user && (
        <MyWrapper>
          <div className={styles.main__div}>
            <div className={styles.header__flex}>
              <div className={styles.yellow__circle} />
              <ProfileImage url={user.profile} size="medium" isModify="modifyProfile" />
              <span className={cx("material-icons-outlined", "settings")}>settings</span>
            </div>
            <div className={styles.info__div}>{children}</div>
          </div>
        </MyWrapper>
      )}
    </>
  );
};

export default MyPageSettings;
