import { Fetcher } from "@/api/axios";
import useSWR from "swr";

// ! FETCH USER DATA
const useUser = () => {
  const uid = "useruser1";
  const { data, mutate, error } = useSWR(`user/${uid}`, Fetcher);

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;
  return {
    loading,
    loggedOut,
    // user: data ? data.data : data, // -> runtimeerror
    user: loading
      ? ""
      : {
          type: "consumer",
          userId: "useruser1",
          name: "김싸피",
          nickname: "닉네임",
          email: "useruser1@gmail.com",
          address: "대전광역시 유성구 XXX",
          profile: "",
          regDate: "2022-10-25",
        }, //data.data.userInfo,
    mutate,
  };
};

export default useUser;
