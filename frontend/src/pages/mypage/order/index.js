import MyHeader from "@/components/mypage/MyHeader";
import MyWrapper from "@/components/common/MyWrapper";
import MyListItem from "@/components/mypage/MyListItem";
import styles from "./index.module.scss";
import useRes from "@/hooks/useRes";
import PageNation from "@/components/common/PageNation";
import { useEffect, useState } from "react";

const CustomerOrderList = () => {
  const { orderList } = useRes();
  const [pageIndex, setPageIndex] = useState(1);
  const { data, maxPage, mutate } = orderList({ pageIndex });
  const [numLst, setNumList] = useState([1]); //[ 1, 2, 3, 4, 5]
  const [selectNumLst, setSelectNumList] = useState([1]); //[ 1, 2, 3], [ 4, 5 ]

  useEffect(() => {
    if (!data) return;
    const setPage = () => {
      if (maxPage === 1) return;
      let tmpNumLst = [];
      for (let i = 1; i <= maxPage; i++) {
        tmpNumLst.push(i);
      }
      setNumList(tmpNumLst);
    };
    setPage();
  }, [data]);

  const setCurrentPage = () => {
    setSelectNumList(numLst.slice(Math.floor((pageIndex - 1) / 3) * 3, Math.floor((pageIndex - 1) / 3) * 3 + 3));
    mutate();
  };

  useEffect(() => {
    if (!data) return;
    setCurrentPage();
  }, [pageIndex, numLst]);

  return (
    <MyWrapper>
      <MyHeader />
      <div className={styles.main__div}>
        {data &&
          data.map((res, idx) => (
            <div key={idx}>
              <MyListItem
                bookId={res.bookId}
                image={res.image}
                storeName={res.storeName}
                request={res.request}
                dueDate={res.dueDate}
              />
            </div>
          ))}
        <PageNation setPageIndex={setPageIndex} selectNumLst={selectNumLst} pageIndex={pageIndex} maxPage={maxPage} />
      </div>
    </MyWrapper>
  );
};

export default CustomerOrderList;
