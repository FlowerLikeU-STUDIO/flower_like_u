import MySetting from "@/components/auth/MySetting";
import GetRoadAdr from "@/components/common/GetRoad";
import useMypage from "@/hooks/useMypage";
import axios from "axios";
import classnames from "classnames";
import { useEffect, useRef, useState } from "react";
import styles from "./modify.module.scss";

const ModifyAuth = () => {
  const cx = classnames.bind(styles);
  // 수정여부
  const [isModify, setIsModify] = useState(false);
  // 닉네임 중복체크
  const [isNickname, setIsNickname] = useState(false);
  const [newNick, setNewNick] = useState("");
  // 주소 입력
  const [addr, setAddr] = useState({ zipCode: "", street: "", detail: "", sigunguCode: "" });

  const uid = "mypage-buyer";
  // const uid = "mypage-seller";
  const { data, type } = useMypage(uid);
  // console.log(data);

  const inputNickname = (e) => {
    const inputV = e.target.value;
    if (inputV.length < 10) {
      setNewNick(e.target.value);
      console.log(inputV);
    } else {
      setNewNick(inputV.slice(0, 10));
      alert("닉네임은 10자 미만입니다.");
    }
  };

  // TODO 닉네임 중복체크
  const NicknameCheck = (e) => {
    e.preventDefault();
    setIsNickname(!isNickname);
  };

  const SearchRoadAdr = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setNewNick(data.nickname);
  }, [data]);

  return (
    <>
      {data && (
        <MySetting>
          <form id="modify__form" className={styles.modify__form}>
            <label className={styles.label}>이메일</label>
            <li className={styles.list__tag}>{data.email}</li>
            <label className={styles.label}>이름</label>
            <li className={styles.list__tag}>{data.name}</li>
            <label htmlFor="nick" className={styles.label}>
              닉네임
            </label>
            <div className={styles.nickname__div}>
              <li className={styles.list__tag}>
                <input
                  id="nick"
                  name="닉네임"
                  className={styles.input__box}
                  onChange={inputNickname}
                  value={newNick || ""}
                  disabled={!isModify}
                />
              </li>
              {isModify && (
                <button
                  className={cx(styles.nickname__check, {
                    [styles.nickname__check__false]: !isNickname,
                    [styles.nickname__check__true]: isNickname,
                  })}
                  onClick={NicknameCheck}
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
                <input
                  id="addr"
                  className={styles.input__box}
                  name="주소"
                  value={data.address || ""}
                  disabled={!isModify}
                />
              )}
            </li>
          </form>
          <div className={styles.position__btn}>
            <button
              type="submit"
              form="modify__form"
              className={cx(styles.submit__btn, {
                [styles.edit__falsebtn]: !isModify,
                [styles.edit__truebtn]: isModify,
              })}
              onClick={(e) => {
                e.preventDefault();
                setIsModify(!isModify);
              }}
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
