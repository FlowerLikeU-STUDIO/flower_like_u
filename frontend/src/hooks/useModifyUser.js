import Axios, { Fetcher } from "@/api/axios";
import useSWR from "swr";
//다빈// https://velog.io/@familyman80/%EB%B9%84%EB%8F%99%EA%B8%B0-%EC%A0%84%EC%97%AD%EA%B4%80%EB%A6%AC-redux-%EB%A7%90%EA%B3%A0-%ED%8E%B8%ED%95%98%EA%B2%8C-SWR-%EB%A1%9C

// ! 닉네임, 비밀번호
const useModifyUser = () => {
  // 닉네임 중복 체크
  const nickNameCheck = (nickname) => {
    const uid = "useruser1";
    const { data, mutate, error } = useSWR(`user/chkNickname/${nickname}`, Fetcher);
    const loading = !data && !error;
    const loggedOut = error && error.status === 403;

    return {
      loading,
      loggedOut,
      nicknameRes: loading ? "" : data.data.result,
      mutate,
    };
  };

  return {
    nickNameCheck,
  };
};

export default useModifyUser;
