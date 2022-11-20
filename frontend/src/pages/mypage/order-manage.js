import MyHeader from "@/components/mypage/MyHeader";
import MyWrapper from "@/components/common/MyWrapper";
import StoreOrderManage from "@/components/mypage/StoreOrderManage";

const OrderManage = () => {
  return (
    <MyWrapper>
      <MyHeader />
      <StoreOrderManage />
    </MyWrapper>
  );
};

export default OrderManage;
