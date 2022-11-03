import { Fetcher } from "@/api/axios";
import useSWR from "swr";

// ! FETCH USER DATA
const useUser = () => {
  //!!!! 현재 요청할 유저 아이디 넣기
  const uid = "useruser2";
  const { data, mutate, error } = useSWR(`user/${uid}`, Fetcher);

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  // if(data.data.result !=="success") return err
  return {
    loading,
    loggedOut,
    user: data ? data.data.userInfo : data, // -> runtimeerror
    // @ 최종로직
    // user: loading ? "" : data.data.userInfo,
    mutate,
    /* 그외 참고할 데이터
    @ 꽃가게 더미데이터
    user: loading
      ? ""
      : {
          result: "success",
          userInfo: {
            type: "store",
            userId: "useruser2",
            name: "김싸피",
            email: "ssafyb209@gmail.com",
            storeName: "flowershop",
            license: "02-003-00005",
            address: "대전광역시 유성구 XXX",
            profile: "base64 image",
            holidays: [
              { idx: "0", val: true }, //일요일
              { idx: "1", val: false },
              { idx: "2", val: false },
              { idx: "3", val: false },
              { idx: "4", val: false },
              { idx: "5", val: false },
              { idx: "6", val: true },
            ],
            introduction: "문의 환영합니다~",
            rating: 4.35,
            regDate: "2022-10-25",
          },
        },
    @ 회원 더미데이터
    user: loading
      ? ""
      : {
          result: "success",
          userInfo: {
            type: "consumer",
            userId: "useruser1",
            name: "김싸피",
            nickname: "닉네임",
            email: "useruser1@gmail.com",
            address: "대전광역시 유성구 XXX",
            profile: "",
            regDate: "2022-10-25",
          },
        },
    */
  };
};

export default useUser;
