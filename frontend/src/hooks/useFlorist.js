import { Fetcher } from "@/pages/api/client";
import useSWR from "swr";

const useFlorist = () => {
  const floristList = ({ pageIndex, selectSize, selectSido, selectSigungu, inputText, currentSort }) => {
    const { data, mutate, error } = useSWR(
      pageIndex
        ? inputText
          ? `user/stores?page=${pageIndex}&size=${selectSize}&sd=${selectSido}&sgg=${selectSigungu}&sn=${inputText}&sort=${currentSort}`
          : `user/stores?page=${pageIndex}&size=${selectSize}&sd=${selectSido}&sgg=${selectSigungu}&sort=${currentSort}`
        : null,
      Fetcher
    );
    const loading = !data && !error;

    if (data && data.result === "fail")
      return {
        data: null,
        maxPage: 1,
      };
    return {
      loading,
      data: data ? data.storeInfo.list : data,
      maxPage: data ? data.storeInfo.maxPage : data,
      mutate,
    };
  };
  const customFloristList = ({ pageIndex, selectSize, selectSido, selectSigungu, inputText }) => {
    const { data, mutate, error } = useSWR(
      pageIndex
        ? inputText
          ? `user/stores?page=${pageIndex}&size=${selectSize}&sd=${selectSido}&sgg=${selectSigungu}&sn=${inputText}`
          : `user/stores?page=${pageIndex}&size=${selectSize}&sd=${selectSido}&sgg=${selectSigungu}`
        : null,
      Fetcher
    );
    const loading = !data && !error;

    if (data && data.result === "fail")
      return {
        data: null,
        maxPage: 1,
      };
    return {
      loading,
      data: data ? data.storeInfo.list : data,
      maxPage: data ? data.storeInfo.maxPage : data,
      mutate,
    };
  };
  return {
    floristList,
    customFloristList,
  };
};

export default useFlorist;
