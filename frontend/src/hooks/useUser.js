import axios from "axios";
import useSWR from "swr";

const userFetcher = () => {
  return axios.get("/users").then((res) => res);
};
const useUser = () => {
  const { data, mutate, error } = useSWR("user", userFetcher);

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;
  return {
    loading,
    loggedOut,
    user: data ? data.data : data,
    mutate,
  };
};

export default useUser;
