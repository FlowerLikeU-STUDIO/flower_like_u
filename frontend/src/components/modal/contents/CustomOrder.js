import CustomFlorist from "@/components/custom/order/CustomFlorist";
import CustomReservation from "@/components/custom/order/CustomReservation";
import { client } from "@/pages/api/client";
import { useEffect, useState } from "react";

const CustomOrder = ({ orderStep }) => {
  const [step, setStep] = useState(orderStep);
  const [storeId, setStoreId] = useState();
  const [flowerId, setFlowerId] = useState();
  const [request, setRequest] = useState();
  const [dueDate, setDueDate] = useState();

  // *debugging start
  const data = {
    storeId: storeId,
    flowerId: flowerId,
    request: request,
    dueDate: dueDate, // @예약날짜
  };
  useEffect(() => {
    console.log(data);
  }, [data]);
  // *debugging end

  // 예약 데이터 제출
  const submitData = () => {
    const data = {
      storeId: storeId,
      flowerId: flowerId,
      request: request,
      dueDate: dueDate,
    };
    if (!storeId) {
      alert("스토어를 선택해주세요");
      return;
    }
    const res = client.post("book/custom", data).then((res) => res.data);
    if (res.result === "success") {
      alert("성공적으로 예약되었습니다.");
      return;
    }
  };

  return (
    <>
      {step === "florist" ? (
        <CustomFlorist storeId={storeId} setStep={setStep} setStoreId={setStoreId} />
      ) : (
        <CustomReservation setStep={setStep} />
      )}
    </>
  );
};

export default CustomOrder;
