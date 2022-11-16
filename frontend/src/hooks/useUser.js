import storage from "@/lib/utils/storage";
import { client } from "@/pages/api/client";
import useSWR from "swr";

const userFetcher = (url) => client.get(url).then((res) => res.data);

const useUser = () => {
  const { data: isLogin } = useSWR("logIn", storage);
  const { data, mutate, error } = useSWR(isLogin ? "user" : null, userFetcher);
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
