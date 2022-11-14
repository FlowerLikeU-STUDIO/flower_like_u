import { Fetcher } from "@/pages/api/client";
import { client } from "@/pages/api/client";
import useSWR from "swr";

// export const Fetcher = (url) =>
//   client.get(url).then((res) => {
//     cosnole.log(res);
//     return res;
//   });
const useDesign = () => {
  const desginList = (currentPage) => {
    const { data, error, mutate } = useSWR(currentPage ? `custom?page=${currentPage}&size=4` : null, Fetcher);
    const loading = !data && !error;

    return {
      loading,
      mutate,
      data: data ? data.designList : data,
      maxPage: data ? data.maxPage : 1,
    };
  };

  const designDetail = ({ flowerId }) => {
    const { data, error } = useSWR(flowerId ? `custom/detail/${flowerId}` : null, Fetcher);
    const loading = !data && !error;

    if (data && data.result === "fail") {
      return {
        basics: null,
      };
    }

    return {
      loading,
      basics: data ? data.flowerInfo.basics : data,
      details: data ? data.flowerInfo.details : data,
    };
  };
  return {
    desginList,
    designDetail,
  };
};

export default useDesign;
