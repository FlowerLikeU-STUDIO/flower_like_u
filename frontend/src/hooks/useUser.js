import { client } from "@/pages/api/client";
import useSWR from "swr";

// ! FETCH USER DATA
const useUser = () => {
  const userFetcher = (url) => client.get(url).then((res) => res.data);

  const { data, mutate, error } = useSWR("user", userFetcher);
  const loading = !data && !error;
  const loggedOut = error && error.status === 403;
  return {
    loading,
    loggedOut,
    user: data ? data.userInfo : data,
    mutate,
  };
};

export default useUser;
