import MyHeader from "@/components/mypage/MyHeader";
import MyWrapper from "@/components/common/MyWrapper";
import ResDetail from "@/components/mypage/ResDetail";
import useSWR from "swr";

const ReservationDetail = () => {
  return (
    <MyWrapper>
      <MyHeader />
      <ResDetail />
    </MyWrapper>
  );
};

export default ReservationDetail;
