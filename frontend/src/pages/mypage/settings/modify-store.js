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
  // 상점명
  const [newStoreName, setNewStoreName] = useState("");
  // 주소 입력
  const [addr, setAddr] = useState({
    zipCode: "",
    street: "",
    details: "",
    sigunguCode: "",
    latitude: "",
    longitude: "",
  });
  // 휴무일
  const restDay = ["일", "월", "화", "수", "목", "금", "토"];
  const [submitHolidays, setHolidays] = useState([false, false, false, false, false, false, false]);

  const inputStoreName = (e) => {
    const inputV = e.target.value;
    if (inputV.length <= 50) {
      setNewStoreName(e.target.value);
    } else {
      setNewStoreName(newStoreName.slice(0, 50));
      alert("상점명은 50자 이하로 제한됩니다.");
    }
  };

  const setRestDay = (e) => {
    e.preventDefault();
    let copyOfSubmitRestDay = [...submitHolidays];
    copyOfSubmitRestDay[e.target.value] = !copyOfSubmitRestDay[e.target.value];
    setHolidays(copyOfSubmitRestDay);
  };

  const dataSubmit = async (e) => {
    e.preventDefault();
    if (isModify === false) {
      setIsModify(true);
    }
    if (isModify === true) {
      if (!newStoreName) {
        alert("상점명을 설정해주세요");
        return;
      }
      if (!addr.street) {
        alert("주소를 입력해주세요");
        return;
      }
      const newData = {
        store: newStoreName,
        address: addr,
        holidays: submitHolidays,
      };
      const res = await client.put("user", newData).then((res) => res.data);
      console.log(res);
      if (res.result === "success") {
        mutate();
        alert("성공적으로 수정되었습니다.");
        setIsModify(false);
      }
    }
  };

  const setModiTrue = (e) => {
    e.preventDefault();
    setIsModify(true);
  };

  useEffect(() => {
    if (user) {
      setNewStoreName(newStoreName || user.storeName || "");
      setHolidays(user.holidays || [false, false, false, false, false, false, false]);
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
            <label className={styles.label}>사업자 등록번호</label>
            <li className={styles.list__tag}>{user.license}</li>
            <label htmlFor="storename" className={styles.label}>
              상점명
            </label>
            <div className={styles.nickname__div}>
              <li className={styles.list__tag}>
                <textarea
                  id="storename"
                  name="상점명"
                  autoFocus
                  className={styles.store__name}
                  onChange={inputStoreName}
                  value={newStoreName}
                  disabled={!isModify}
                />
              </li>
            </div>
            <label htmlFor="storeRest" className={styles.label}>
              휴무일 지정
            </label>
            <ul className={styles.list__tag}>
              {restDay.map((rest, idx) => (
                <button
                  key={idx}
                  className={!submitHolidays[idx] ? styles.rest__btn : styles.is_rest__btn}
                  disabled={!isModify}
                  onClick={setRestDay}
                  value={idx}
                >
                  {rest}
                </button>
              ))}
            </ul>
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
                  setNewStoreName(user.storeName || "");
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
