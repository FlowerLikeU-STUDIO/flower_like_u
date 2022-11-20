import { useState } from "react";
import styled from "styled-components";
import OrderManageTable from "./OrderManageTable";

const StoreOrderManageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2rem;
  align-items: center;
`;
const OrderStatusWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  justify-content: center;
  justify-content: space-around;
`;

const OrderStatusButton = styled.button`
  padding: 8px 12px;
  width: 120px;
  border: 1px solid transparent;
  border-radius: 6px;
  background-color: #efefef;

  &.active {
    background-color: #ecffc1;
  }
`;

const OrderTableWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  max-width: 950px;
`;

const StoreOrderManage = () => {
  const [orderState, setOrderState] = useState({
    status: "book",
    pageIndex: 0,
  });

  const changeStatus = (value) => {
    setOrderState({ status: value, pageIndex: 0 });
  };

  const changePageIndex = (value) => {
    setOrderState({ ...orderState, pageIndex: value });
  };

  return (
    <StoreOrderManageWrapper>
      <OrderStatusWrapper>
        <OrderStatusButton
          type="button"
          onClick={() => {
            changeStatus("book");
          }}
          className={orderState.status === "book" ? "active" : ""}
        >
          예약
        </OrderStatusButton>
        <OrderStatusButton
          type="button"
          onClick={() => {
            changeStatus("progress");
          }}
          className={orderState.status === "progress" ? "active" : ""}
        >
          접수
        </OrderStatusButton>
        <OrderStatusButton
          type="button"
          onClick={() => {
            changeStatus("done");
          }}
          className={orderState.status === "done" ? "active" : ""}
        >
          완료
        </OrderStatusButton>
      </OrderStatusWrapper>
      <OrderTableWrapper>
        <button
          type="butotn"
          onClick={() => {
            if (orderState.pageIndex !== 0) {
              changePageIndex(orderState.pageIndex - 1);
            }
          }}
        >
          <i class="fa-solid fa-chevron-left"></i>
        </button>

        <OrderManageTable {...orderState} />
        <button
          type="butotn"
          onClick={() => changePageIndex(orderState.pageIndex + 1)}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </OrderTableWrapper>
    </StoreOrderManageWrapper>
  );
};

export default StoreOrderManage;
