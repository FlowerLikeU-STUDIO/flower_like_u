import useSWR from "swr";
import { Fetcher } from "@/pages/api/client";
import useDebounce from "@/hooks/useDebounce";

const useFlorist = () => {
  const floristList = ({ pageIndex, selectSize, selectSido, selectSigungu, inputText, currentSort }) => {
    const debounceSearch = useDebounce(inputText, 1000);
    const { data, error } = useSWR(
      pageIndex
        ? () =>
            debounceSearch
              ? `user/stores?page=${pageIndex}&size=${selectSize}&sd=${selectSido}&sgg=${selectSigungu}&sn=${debounceSearch}&sort=${currentSort}`
              : `user/stores?page=${pageIndex}&size=${selectSize}&sd=${selectSido}&sgg=${selectSigungu}&sort=${currentSort}`
        : null,
      Fetcher,
      { revalidateOnFocus: false }
    );

    const loading = !data && !error;

    if (data && data.result === "fail") {
      return {
        data: null,
        maxPage: 1,
      };
    }
    return {
      loading,
      data: data ? data.storeInfo.list : data,
      maxPage: data ? data.storeInfo.maxPage : data,
    };
  };

  const customFloristList = ({ pageIndex, selectSize, selectSido, selectSigungu, inputText }) => {
    const { data, mutate, error } = useSWR(
      pageIndex
        ? inputText
          ? `user/stores?page=${pageIndex}&size=${selectSize}&sd=${selectSido}&sgg=${selectSigungu}&sn=${inputText}`
          : `user/stores?page=${pageIndex}&size=${selectSize}&sd=${selectSido}&sgg=${selectSigungu}`
        : null,
      Fetcher,
      { revalidateOnFocus: false }
    );
    const loading = !data && !error;

    if (data && data.result === "fail") {
      return {
        data: null,
        maxPage: 1,
      };
    }
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
