import { Fetcher } from "@/pages/api/client";
import useSWR from "swr";

const useDesign = () => {
  const desginList = (currentPage) => {
    const { data, error, mutate } = useSWR(currentPage ? `custom?page=${currentPage}&size=4` : null, Fetcher);
    const loading = !data && !error;
    console.log(data);

    return {
      loading,
      mutate,
      data: data ? data.designList : data,
      maxPage: data ? data.maxPage : 1,
    };
  };

  const designDetail = () => {
    const { data, error } = useSWR(`custom/${flowerId}`, Fetcher);
  };
  return {
    desginList,
    designDetail,
  };
};

export default useDesign;
