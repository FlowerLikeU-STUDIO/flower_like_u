import { useEffect } from "react";
import { useRouter } from "next/router";
import MyContentBtn from "./MyContentBtn";
import styles from "./MyHeader.module.scss";
import ProfileImage from "@/components/common/ProfileImage";
import Contents from "./Contents";
import Link from "next/link";
import useUser from "@/hooks/useUser";

const MyHeader = () => {
  const router = useRouter();
  const { user, error } = useUser();

  useEffect(() => {
    if (!user.type) return;
    if (user.type === "store") {
      // * replace로 히스토리 스택에 쌓이는 것 방지
      router.replace("/mypage/feeds");
    } else if (user.type === "consumer") {
      router.replace("/mypage/reservation");
    }
  }, []);

  return (
    <>
      {user && (
        <>
          <div className={styles.profile}>
            <ProfileImage url={user.profile} size="medium" />
            <div className={styles.flexdiv}>
              <div>
                {user.type === "seller" ? (
                  <span className={styles.userName}>{user.storeName || user.name}</span>
                ) : (
                  <span className={styles.userName}>{user.nickname || user.name}</span>
                )}
                <Link href="/mypage/settings">
                  <a className={styles.settings}>
                    <span className="material-icons-outlined">settings</span>
                  </a>
                </Link>
              </div>
              {user.type === "seller" && (
                <div className={styles.profile_seller}>
                  <p>판매자 프로필 하단</p>
                  <Contents rating={user.rating} introduce={user.introduce} feedsNum={user.feedsNum} />
                </div>
              )}
            </div>
          </div>
          <MyContentBtn props={user.type} />
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
