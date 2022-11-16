import MyHeader from "@/components/mypage/MyHeader";
import MyWrapper from "@/components/common/MyWrapper";
import CustomDetailCard from "@/components/common/CustomDetailCard";
import Script from "next/script";

const DesignDetail = () => {
  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.2/FileSaver.min.js"></Script>
      <Script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></Script>
      <MyWrapper>
        <MyHeader />
        <CustomDetailCard />
      </MyWrapper>
    </>
  );
};

export default DesignDetail;
