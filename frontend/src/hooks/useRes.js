import { Fetcher } from "@/pages/api/client";
import useSWR from "swr";

const useRes = () => {
  const resList = ({ pageIndex }) => {
    const { data, error, mutate } = useSWR(pageIndex ? `book/?page=${pageIndex}&size=4&filter=order` : null, Fetcher);
    const loading = !data && !error;
    console.log(data);

    if (data && data.result === "fail") {
      return {
        data: null,
        maxPage: 1,
      };
    }

    return {
      loading,
      data: data ? data.orderInfo.list : data,
      maxPage: data ? data.orderInfo.maxPage : 1,
      mutate,
    };
  };

  const orderList = ({ pageIndex }) => {
    const { data, error, mutate } = useSWR(pageIndex ? `book/?page=${pageIndex}&size=4&filter=done` : null, Fetcher);
    const loading = !data && !error;

    if (data && data.result === "fail") {
      return {
        data: null,
        maxPage: 1,
      };
    }

    return {
      loading,
      data: data ? data.doneInfo.list : data,
      maxPage: data ? data.doneInfo.maxPage : 1,
      mutate,
    };
  };

  const resDetail = ({ bookId }) => {
    const { data, error, mutate } = useSWR(bookId ? `book/detail/${bookId}` : null, Fetcher);
    const loading = !data && !error;
    if (data) {
      console.log(data);
    }

    if (data && data.result === "fail") {
      return {
        basics: null,
      };
    }
    return {
      loading,
      basics: data ? data.bookInfo.basics : data,
      details: data ? data.bookInfo.details : data,
      mutate,
    };
  };

  return {
    resList,
    orderList,
    resDetail,
  };
};

export default useRes;
