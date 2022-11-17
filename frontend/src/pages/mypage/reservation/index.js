import MyListItem from "@/components/mypage/MyListItem";
import MyHeader from "@/components/mypage/MyHeader";
import MyWrapper from "@/components/common/MyWrapper";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import useRes from "@/hooks/useRes";
import PageNation from "@/components/common/PageNation";

const CustomerReservation = () => {
  // https://velog.io/@a_in/Next.js-Error-Abort-fetching-for-route
  const { resList } = useRes();
  const [pageIndex, setPageIndex] = useState(1);
  const { data, maxPage, mutate } = resList({ pageIndex });
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
      {data ? (
        <div className={styles.main__div}>
          {data.map((res, idx) => (
            <div key={idx}>
              <MyListItem
                bookId={res.bookId}
                image={res.image}
                storeName={res.storeName}
                request={res.request}
                bookDate={res.bookDate}
                dueDate={res.dueDate}
                type={res.type}
              />
            </div>
          ))}
          <PageNation setPageIndex={setPageIndex} selectNumLst={selectNumLst} pageIndex={pageIndex} maxPage={maxPage} />
        </div>
      ) : (
        <div className={styles.not__data}>
          <p className={styles.go__res}>🌸🌹 꽃집에 예약하면 여기에 표시됩니다. 🌻🌼</p>
        </div>
      )}
    </MyWrapper>
  );
};

export default CustomerReservation;
