import Button from "@/styles/common/Button";
import styles from "./mypage.module.scss";
import useSWR from "swr";
import { useEffect, useState } from "react";
import ProfileImage from "@/components/mypage/common/ProfileImage";

const Mypage = () => {
  const [userData, setUserData] = useState("");
  const [userType, setUserType] = useState("buyer");
  const [component, setComponent] = useState("0");

  // ! useSWR이 데이터 변경되면 자동으로 fetching해줌
  const { data, error } = useSWR("https://nextjs-course-f7f75-default-rtdb.firebaseio.com/mypage.json", (url) =>
    fetch(url).then((res) => res.json())
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

  if (error) {
    return <p>No data Yet</p>;
  }

  if (!data || !userData) {
    return <p>Loading...</p>;
  }
  console.log(userData);

  return (
    <div className={styles.layout}>
      <div className={styles.profile}>
        <ProfileImage
          url={userData.profile !== "" ? userData.profile : "/auth/floristDefaultProfile.png"}
          size="medium"
        />
        <div className={styles.flexdiv}>
          <div>
            {userType === "seller" ? (
              <span className={styles.userName}>{userData.storeName || userData.name}</span>
            ) : (
              <span className={styles.userName}>{userData.nickname || userData.name}</span>
            )}
            <span className="material-icons-outlined">settings</span>
          </div>
          {userType === "seller" && (
            <div className={styles.profile_seller}>
              <p>판매자 프로필 하단</p>
            </div>
          )}
        </div>
      </div>
      <hr />
      <div>
        <Button color="red400" onClick={() => console.log("버튼클릭됨")}>
          가나다라마바사
        </Button>

        {/* <button className={`commentBtn ${isTrue ? "btn_yellow" : "btn_default"}`}>asdf</button> */}
        <button>asdf</button>
      </div>
      {/* {role === "seller" ? <사용자 /> : <사업자 />} */}
    </div>
  );
};

export default Mypage;
