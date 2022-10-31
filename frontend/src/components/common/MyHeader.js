import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MyContentBtn from "./MyContentBtn";
import styles from "./MyHeader.module.scss";
import ProfileImage from "@/components/common/ProfileImage";
import { isEmpty } from "lodash";
import Contents from "./Contents";
import Link from "next/link";
import useMypage from "@/hooks/useMypage";

const MyHeader = () => {
  const router = useRouter();

  // const uid = "mypage-buyer";
  const uid = "mypage-seller";
  const { data, type, isError, isLoading } = useMypage(uid);
  const [userData, setUserData] = useState("");
  const [userType, setUserType] = useState("");

  if (isError) {
    return <p>No data Yet</p>;
  }

  useEffect(() => {
    if (!data) {
      return;
    }
    if (data) {
      setUserType(type);
      setUserData(data);
    }
  }, [data]);

  useEffect(() => {
    if (!userType) return;
    if (userType === "seller") {
      // * replace로 히스토리 스택에 쌓이는 것 방지
      router.replace("/mypage/feeds");
    } else if (userType === "buyer") {
      router.replace("/mypage/reservation");
    }
  }, []);

  return (
    <>
      {isLoading || isEmpty(userData) ? (
        <>Loading...</>
      ) : (
        <>
          <div className={styles.profile}>
            <ProfileImage url={userData.profile} size="medium" />
            <div className={styles.flexdiv}>
              <div>
                {userType === "seller" ? (
                  <span className={styles.userName}>{userData.storeName || userData.name}</span>
                ) : (
                  <span className={styles.userName}>{userData.nickname || userData.name}</span>
                )}
                <Link href="/mypage/settings">
                  <a className={styles.settings}>
                    <span className="material-icons-outlined">settings</span>
                  </a>
                </Link>
              </div>
              {userType === "seller" && (
                <div className={styles.profile_seller}>
                  <p>판매자 프로필 하단</p>
                  <Contents rating={userData.rating} introduce={userData.introduce} feedsNum={userData.feedsNum} />
                </div>
              )}
            </div>
          </div>
          <MyContentBtn props={userType} />
        </>
      )}
    </>
  );
};

export default MyHeader;

// const getData = async () => {
//   try {
//     const data = await axios.get("https://nextjs-course-f7f75-default-rtdb.firebaseio.com/mypage.json");
//     return data;
//   } catch (err) {
//     console.log("mypageerr", err);
//     return false;
//   }
// };

// export async function getServerSideProps(context) {
//   const data = await getData();
//   console.log("asdfasdfasdff", data);
//   const userDataRes = [];
//   if (data) {
//     const userData = data.data;
//     for (const key in userData) {
//       if (userData[key].statusCode === "200") {
//         //! buyer, seller check
//         //! 우선 여기서 buyer seller 주석 제거해서 가져오는 방식
//         if (userData[key].response.type === "buyer") {
//           userDataRes.push(userData[key].response);
//         }
//         // if (userData[key].response.type === "seller") {
//         //   userDataRes.push(userData[key].response);
//         // }
//       } else {
//         console.log("statusCode - not 200");
//       }
//     }
//   }
//   console.log({ ...userDataRes }[0]);

//   return {
//     props: {
//       userData: { ...userDataRes }[0],
//     },
//   };
// }
