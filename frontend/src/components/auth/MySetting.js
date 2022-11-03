import MyWrapper from "@/components/common/MyWrapper";
import ProfileImage from "@/components/common/ProfileImage";
import useUser from "@/hooks/useUser";
import styles from "./MySetting.module.scss";
import classnames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import Axios from "@/api/axios";

const MyPageSettings = ({ children }) => {
  const cx = classnames.bind(styles);
  const { user, mutate } = useUser();
  const [userImg, setUserImg] = useState("");
  const imgInputRef = useRef();

  useEffect(() => {
    if (!user) {
      return;
    }
    setUserImg(userImg ? userImg : user.profile);
  }, [user]);

  const putImg = async () => {
    const data = {
      userId: user.userId,
      image: userImg,
    };
    const res = await Axios.put("user/changeImg", data).then((res) => res.data);
    if (res.result === "success") {
      alert("이미지가 성공적으로 변경되었습니다.");
      // TODO mutate로직 생각해보기
      mutate();
    } else {
      alert("실패");
    }
  };

  const uploadImg = () => {
    const element = imgInputRef.current.files[0];
    if (imgInputRef.current.files.length === 0) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(element);
    reader.onloadend = function () {
      const res = reader.result;
      console.log("RESULT", res);
      setUserImg(res);
      putImg();
    };
    reader.onerror = function () {
      console.log("there are some problems");
    };
  };

  return (
    <>
      {user && (
        <MyWrapper>
          <div className={styles.main__div}>
            <div className={styles.header__flex}>
              <div className={styles.yellow__circle} />
              <ProfileImage url={userImg} size="medium" isModify="modifyProfile" />
              <div className={styles.image__upload}>
                <label htmlFor="file-input">
                  <span className={cx("material-icons-outlined", "settings")}>settings</span>
                </label>
                <input id="file-input" type="file" ref={imgInputRef} onChange={uploadImg} accept="image/*" />
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
