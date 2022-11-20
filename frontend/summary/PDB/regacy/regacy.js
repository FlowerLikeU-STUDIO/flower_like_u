import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

import styles from "./index.module.scss";
import Button from "@/components/common/Button";
import ProfileImage from "@/components/common/ProfileImage";
import Contents from "@/components/mypage/flower_store/Contents";

const Mypage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState("");
  const [userType, setUserType] = useState("");

  const pagePath = {
    buyer: ["reserv", "order", "design"],
    seller: ["feeds", "reviews", "order-manage"],
  };

  const btnClick = (e) => {
    e.preventDefault();
    const p = e.target.value;
    router.push(`/mypage/${p}`);
  };

  // ! useSWR이 데이터 변경되면 자동으로 fetching해줌
  const { data, error } = useSWR(
    "https://nextjs-course-f7f75-default-rtdb.firebaseio.com/mypage.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const transFormedData = [];
      for (const key in data) {
        /* 
        ! buyer, seller check
        if (data[key].response.type === "buyer") {
          setUserType("buyer");
        } else if (data[key].response.type === "seller") {
          setUserType("seller");
        }
        (data[0] = seller), [1], buyer;
        */
      }
      //@임시 데이터 GET
      //! buyer
      // setUserType("buyer");
      // transFormedData.push(data[0].response);
      // setUserData({ ...transFormedData }[0]);
      // !seller
      setUserType("seller");
      transFormedData.push(data[1].response);
      setUserData({ ...transFormedData }[0]);
    }
  }, [data]);

  useEffect(() => {
    if (!userType) return;
    router.push(`/mypage/${pagePath[userType][0]}`);
  }, [userType]);

  if (error) {
    return <p>No data Yet</p>;
  }

  if (!data || !userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.layout}>
      <div className={styles.profile}>
        <ProfileImage
          url={
            userData.profile !== ""
              ? userData.profile
              : "/auth/floristDefaultProfile.png"
          }
          size="medium"
        />
        <div className={styles.flexdiv}>
          <div>
            {userType === "seller" ? (
              <span className={styles.userName}>
                {userData.storeName || userData.name}
              </span>
            ) : (
              <span className={styles.userName}>
                {userData.nickname || userData.name}
              </span>
            )}
            <span className="material-icons-outlined">settings</span>
          </div>
          {userType === "seller" && (
            <div className={styles.profile_seller}>
              <p>판매자 프로필 하단</p>
              <Contents
                rating={userData.rating}
                introduce={userData.introduce}
                feedsNum={userData.feedsNum}
              />
            </div>
          )}
        </div>
      </div>
      <hr />
      <div>
        <button
          onClick={btnClick}
          className={styles.path__btn}
          value={pagePath[userType][0]}
        >
          {pagePath[userType][0]}
        </button>
        <button
          onClick={btnClick}
          className={styles.path__btn}
          value={pagePath[userType][1]}
        >
          {pagePath[userType][1]}
        </button>
        <button
          onClick={btnClick}
          className={styles.path__btn}
          value={pagePath[userType][2]}
        >
          {pagePath[userType][2]}
        </button>
      </div>
      {/* {role === "seller" ? <사용자 /> : <사업자 />} */}
      {isContent}
    </div>
  );
};
export default Mypage;
