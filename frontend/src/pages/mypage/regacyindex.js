import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import MyHeader from "@/components/common/MyHeader";
import MyWrapper from "@/components/common/MyWrapper";
import MyContentBtn from "@/components/common/MyContentBtn";

const Mypage = ({ userData }) => {
  const router = useRouter();
  const userType = userData?.type;

  const pagePath = { buyer: ["reservation", "order", "design"], seller: ["feeds", "reviews", "order-manage"] };

  useEffect(() => {
    if (!userType) return;
    if (userType === "seller") {
      // * replace로 히스토리 스택에 쌓이는 것 방지
      router.replace(`/mypage/feeds`);
    } else if (userType === "buyer") {
      router.replace("/mypage/reservation");
    }
  }, [userType]);

  if (!userData || !userType) {
    return <p>Loading...</p>;
  }

  return (
    <MyWrapper>
      <MyHeader {...userData} />
      <MyContentBtn props={pagePath[userType]} />
    </MyWrapper>
  );
};
export default Mypage;

const getData = async () => {
  try {
    const data = await axios.get("https://nextjs-course-f7f75-default-rtdb.firebaseio.com/mypage.json");
    return data;
  } catch (err) {
    console.log("mypageerr", err);
    return false;
  }
};

export async function getServerSideProps(context) {
  const data = await getData();

  const userDataRes = [];
  if (data) {
    const userData = data.data;
    for (const key in userData) {
      if (userData[key].statusCode === "200") {
        //! buyer, seller check
        //! 우선 여기서 buyer seller 주석 제거해서 가져오는 방식
        if (userData[key].response.type === "buyer") {
          userDataRes.push(userData[key].response);
        }
        // if (userData[key].response.type === "seller") {
        //   userDataRes.push(userData[key].response);
        // }
      } else {
        console.log("statusCode - not 200");
      }
    }
  }
  console.log({ ...userDataRes }[0]);

  return {
    props: {
      userData: { ...userDataRes }[0],
    },
  };
}
