import Modal from "@/components/modal";
import OrderManageDetail from "@/components/modal/contents/OrderManageDetail";
import { client } from "@/pages/api/client";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";

const TableStyle = styled.table`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 3rem;
  height: 100%;
  width: 90%;
`;

const OrderTableThead = styled.thead`
  display: flex;
  width: 100%;
`;

const OrderTableTr = styled.tr`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border-bottom: 1px solid #edf2f7;
  justify-content: space-between;
`;

const OrderTableTd = styled.td`
  text-align: center;
  width: 100px;

  &.bookId {
    color: blue;
    text-decoration: underline;
  }
`;

const OrderState = {
  waited: "대기",
  inprogress: "진행중",
  done: "완료",
  receipt: "수령완료",
};
const fetcher = (url) => client.get(url).then((res) => res.data);
const Page = ({ status, pageIndex }) => {
  const [modalState, setModalState] = useState(false);
  const [targetOrderId, setTargetOrderId] = useState();
  const { data } = useSWR(
    `book?page=${pageIndex + 1}&size=10&filter=${status}`,
    fetcher
  );

  const openModal = (bookId) => {
    setModalState(true);
    setTargetOrderId(bookId);
  };

  const closeModal = () => {
    setModalState(false);
    setTargetOrderId(null);
  };

  if (data && data.result === "success") {
    return (
      <>
        {modalState && targetOrderId ? (
          <Modal
            children={
              <OrderManageDetail
                closeModal={closeModal}
                bookId={targetOrderId}
              />
            }
          />
        ) : (
          <></>
        )}
        <TableStyle>
          <OrderTableThead>
            <OrderTableTr>
              <OrderTableTd>예약자</OrderTableTd>
              <OrderTableTd>예약번호</OrderTableTd>
              <OrderTableTd>예약날짜</OrderTableTd>
              <OrderTableTd>주문날짜</OrderTableTd>
              <OrderTableTd>꽃다발 종류</OrderTableTd>
              <OrderTableTd>상태</OrderTableTd>
            </OrderTableTr>
          </OrderTableThead>
          <tbody>
            {data[`${status}Info`].list.map((orderItem) => (
              <OrderTableTr key={orderItem.bookId}>
                <OrderTableTd>{orderItem.consumerName}</OrderTableTd>
                <OrderTableTd
                  className="bookId"
                  onClick={() => openModal(orderItem.bookId)}
                >
                  {orderItem.bookId}
                </OrderTableTd>
                <OrderTableTd>{orderItem.bookDate}</OrderTableTd>
                <OrderTableTd>{orderItem.dueDate}</OrderTableTd>
                <OrderTableTd>
                  {orderItem.type === "custom" ? "커스텀" : "피드"}
                </OrderTableTd>
                <OrderTableTd>{OrderState[orderItem.state]}</OrderTableTd>
              </OrderTableTr>
            ))}
          </tbody>
        </TableStyle>
      </>
    );
  }

  if (data && data.result === "fail") {
    return <div>예약 목록이 없습니다.</div>;
  }
};

const OrderManageTable = ({ status, pageIndex }) => {
  return (
    <>
      <Page pageIndex={pageIndex} status={status} />
      <div style={{ display: "none" }}>
        <Page pageIndex={pageIndex + 1} status={status} />
      </div>
    </>
  );
};

export default OrderManageTable;
