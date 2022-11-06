import MyContentBtn from "../common/MyContentBtn";
import useUser from "@/hooks/useUser";
import React from "react";
import HeaderItem from "../common/HeaderItem";

const MyHeader = () => {
  const { user } = useUser();

  return (
    <>
      {user && (
        <>
          <HeaderItem {...user} isMyPage={true} />
          <MyContentBtn props={user.type} />
        </>
      )}
    </>
  );
};

export default React.memo(MyHeader);

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
