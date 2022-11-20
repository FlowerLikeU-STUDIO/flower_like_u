import storage from "@/lib/utils/storage";
import { Fetcher } from "@/pages/api/client";
import useSWR from "swr";

const useUser = () => {
  const { data: isLogin } = useSWR("logIn", storage);
  const { data, mutate, error } = useSWR(isLogin ? "user" : null, Fetcher, { revalidateOnFocus: false });
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
