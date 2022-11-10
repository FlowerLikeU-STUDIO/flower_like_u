import { Fetcher } from "@/pages/api/client";
import useSWR from "swr";

const useCustom = () => {
  const randomFlower = (size, state) => {
    const { data, error, mutate } = useSWR(state ? null : size ? `custom/recommend/${size}` : null, Fetcher);
    const loading = !data && !error;

    return {
      loading,
      flowerData: data,
      mutate,
    };
  };
  return {
    randomFlower,
  };
};

export default useCustom;
