import MyWrapper from "@/components/common/MyWrapper";
import ProfileImage from "@/components/common/ProfileImage";
import useUser from "@/hooks/useUser";
import styles from "./MySetting.module.scss";
import classnames from "classnames/bind";
import { useEffect, useState } from "react";
import { client } from "@/pages/api/client";

const MyPageSettings = ({ children }) => {
  const cx = classnames.bind(styles);
  const { user, mutate } = useUser();
  const [userImg, setUserImg] = useState("");

  useEffect(() => {
    if (!user) {
      return;
    }
    setUserImg(user.profile ? user.profile : "");
  }, [user]);

  const uploadImg = (e) => {
    const ele = e.target.files;
    const element = e.target.files[0];
    if (ele.length === 0) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(element);
    reader.onloadend = function () {
      const res = reader.result;
      putImg(res);
    };
    reader.onerror = function () {};
  };

  const putImg = async (res) => {
    const data = {
      userId: user.userId,
      image: res,
    };
    const axiosRes = await client
      .put("user/changeImg", data)
      .then((res) => res.data);
    if (axiosRes.result === "success") {
      alert("이미지가 성공적으로 변경되었습니다.");
      mutate();
    } else {
      alert("실패");
    }
  };

  return (
    <>
      {user && (
        <MyWrapper>
          <div className={styles.main__div}>
            <div className={styles.header__flex}>
              <div className={styles.yellow__circle} />
              <ProfileImage
                url={userImg}
                size="medium"
                isModify="modifyProfile"
              />
              <div className={styles.image__upload}>
                <label htmlFor="file-input">
                  <span className={cx("material-icons-outlined", "settings")}>
                    settings
                  </span>
                </label>
                <input
                  id="file-input"
                  type="file"
                  onChange={uploadImg}
                  accept="image/*"
                />
              </div>
            </div>
            <div className={styles.info__div}>{children}</div>
          </div>
        </MyWrapper>
      )}
    </>
  );
};

export default MyPageSettings;
