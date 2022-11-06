import Axios from "@/api/axios";
import MySetting from "@/components/mypage/MySetting";
import GetRoadAdr from "@/components/common/GetRoad";
import useUser from "@/hooks/useUser";
import classnames from "classnames";
import { useEffect, useState } from "react";
import styles from "./modify.module.scss";

const ModifyAuth = () => {
  const cx = classnames.bind(styles);
  // useSWR
  const { user, mutate } = useUser();
  // 수정여부
  const [isModify, setIsModify] = useState(false);
  // 상점명
  const [newStoreName, setNewStoreName] = useState("");
  // 주소 입력
  const [addr, setAddr] = useState({ zipCode: "", street: "", detail: "", sigunguCode: "" });

  const inputStoreName = (e) => {
    const inputV = e.target.value;
    if (inputV.length <= 50) {
      setNewStoreName(e.target.value);
    } else {
      setNewStoreName(newStoreName.slice(0, 50));
      alert("상점명은 50자 이하로 제한됩니다.");
    }
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
        type: user.type,
        userId: user.userId,
        store: newStoreName,
        address: addr.street + addr.detail, //!addr로 변경할 것.
        // holidays:
      };

      /**
      //! 추후 holidays 로직 추가 예정( - 백엔드 미완성)
      {
          "type" : "store",
          "userId" : "ssafyb209",
          "store" : "flowershop",
          "address" : {
              "zipCode" : "20312",
              "street" : "대전광역시 유성구 xx로",
              "details" : "OO빌딩 104호",
              "sigunguCode" : "12345",
          },
          "holidays" : [
              {"idx" : "0", "val" : true},
              {"idx" : "1", "val" : false},
              {"idx" : "2", "val" : false},
              {"idx" : "3", "val" : false},
              {"idx" : "4", "val" : false},
              {"idx" : "5", "val" : false},
              {"idx" : "6", "val" : true}
          ]
      }
      */

      // !user/ -> user
      const res = await Axios.put("user/", newData).then((res) => res.data);
      if (res.result === "success") {
        mutate();
        setIsModify(false);
      }
    }
  };

  useEffect(() => {
    if (user) {
      setNewStoreName(newStoreName || user.storeName || "");
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
                  value={user.address || ""}
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
              onClick={dataSubmit}
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
