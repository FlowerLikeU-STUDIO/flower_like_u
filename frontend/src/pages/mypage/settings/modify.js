import MySetting from "@/components/mypage/MySetting";
import GetRoadAdr from "@/components/common/GetRoad";
import useUser from "@/hooks/useUser";
import classnames from "classnames";
import { useEffect, useState } from "react";
import styles from "./modify.module.scss";
import { client } from "@/pages/api/client";

const ModifyAuth = () => {
  const cx = classnames.bind(styles);
  // useSWR
  const { user, mutate } = useUser();
  // 수정여부
  const [isModify, setIsModify] = useState(false);
  // 닉네임
  const [newNick, setNewNick] = useState("");
  // 닉네임 중복체크
  const [isNickname, setIsNickname] = useState(true);
  // 주소 입력
  const [addr, setAddr] = useState({
    zipCode: "",
    street: "",
    details: "",
    sigunguCode: "",
    latitude: "",
    longitude: "",
  });

  const inputNickname = (e) => {
    const inputV = e.target.value;
    setIsNickname(false);
    if (inputV === user.nickname) {
      setIsNickname(true);
    }
    if (inputV.length <= 10) {
      setNewNick(e.target.value);
    } else {
      setNewNick(newNick.slice(0, 10));
      alert("닉네임은 10자 미만으로 제한됩니다.");
    }
  };

  const checkNickName = async (e) => {
    e.preventDefault();
    if (newNick === user.nickname) {
      return;
    }
    const nicknameRes = await client.get(`user/chkNickname/${newNick}`).then((res) => res.data.result);
    if (nicknameRes === "nonDuplicated") {
      setIsNickname(true);
      alert("사용가능한 닉네임입니다.");
    } else {
      setIsNickname(false);
      alert("사용불가능한 닉네임입니다.");
    }
  };

  const setModiTrue = (e) => {
    e.preventDefault();
    setIsModify(true);
  };

  const dataSubmit = async (e) => {
    e.preventDefault();
    if (!isNickname) {
      alert("닉네임 중복확인이 필요합니다.");
      return;
    }
    if (!newNick) {
      alert("닉네임을 설정해주세요");
      return;
    }
    if (addr.street === "") {
      alert("주소를 입력해주세요");
      return;
    }
    const newData = {
      type: user.type,
      userId: user.userId,
      nickname: newNick,
      address: addr,
    };
    const res = await client.put("user", newData).then((res) => res.data);
    if (res.result === "success") {
      alert("성공적으로 수정되었습니다.");
      setIsModify(false);
      mutate();
    }
  };

  useEffect(() => {
    if (user) {
      setNewNick(newNick || user.nickname || "");
    }
  }, [user]);

  return (
    <>
      {user && (
        <MySetting>
          <form id="modify__form" className={styles.modify__form}>
            <label className={styles.label}>이메일</label>
            <li className={styles.list__tag}>{user.email}</li>
            <label className={styles.label}>이름</label>
            <li className={styles.list__tag}>{user.name}</li>
            <label htmlFor="nick" className={styles.label}>
              닉네임
            </label>
            <div className={styles.nickname__div}>
              <li className={styles.list__tag}>
                <input
                  id="nick"
                  name="닉네임"
                  className={styles.input__box}
                  // defaultValue={user.nickname}
                  onChange={inputNickname}
                  value={newNick}
                  disabled={!isModify}
                />
              </li>
              {isModify && (
                <button
                  className={cx(styles.nickname__check, {
                    [styles.nickname__check__true]: isNickname,
                    [styles.nickname__check__false]: !isNickname,
                  })}
                  onClick={checkNickName}
                >
                  중복확인
                </button>
              )}
            </div>
            <label htmlFor="addr" className={styles.label}>
              주소
            </label>
            <li className={styles.list__tag}>
              {isModify ? (
                <GetRoadAdr setAdr={setAddr} adr={addr} />
              ) : (
                <textarea
                  id="addr"
                  className={styles.text__box}
                  name="주소"
                  value={user.address.street + user.address.details || ""}
                  disabled={!isModify}
                />
              )}
            </li>
          </form>
          <div className={styles.position__btn}>
            {isModify && (
              <button
                className={cx(styles.submit__btn, {
                  [styles.edit__falsebtn]: isModify,
                })}
                onClick={() => {
                  setIsModify(!isModify);
                  setNewNick(user.nickname || "");
                }}
              >
                취소
              </button>
            )}
            <button
              type="submit"
              form="modify__form"
              className={cx(styles.submit__btn, {
                [styles.edit__falsebtn]: isModify,
                [styles.edit__truebtn]: !isModify,
              })}
              onClick={!isModify ? setModiTrue : dataSubmit}
            >
              {!isModify ? "수정" : "완료"}
            </button>
          </div>
        </MySetting>
      )}
    </>
  );
};

export default ModifyAuth;
