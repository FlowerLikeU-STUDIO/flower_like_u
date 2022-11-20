import CustomDesignChoice from "@/components/custom/order/CustomDesignChoice";
import CustomReservation from "@/components/custom/order/CustomReservation";
import SuccessAlert from "@/lib/SuccessAlert";
import { client } from "@/pages/api/client";
import { modalClose } from "@/store/reducers/modal";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ProfileCustomOrder = ({ orderStep, storeId, exitCustomResgister }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(orderStep);
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
  useEffect(() => {}, [data]);
  // *debugging end

  // 예약 데이터 제출
  const submitData = async (reservationDate, reqeust) => {
    const data = {
      storeId: storeId,
      flowerId: flowerId,
      request: reqeust,
      dueDate: reservationDate,
    };
    if (!storeId) {
      alert("스토어를 선택해주세요");
      return;
    }
    const res = await client.post("book/custom", data).then((res) => res.data);
    if (res.result === "success") {
      SuccessAlert("성공적으로 예약되었습니다.");
      exitCustomResgister();
      return;
    }
  };
  return (
    <>
      {step === "flower" ? (
        <CustomDesignChoice
          flowerId={flowerId}
          setStep={setStep}
          setFlowerId={setFlowerId}
          exitCustomResgister={exitCustomResgister}
        />
      ) : (
        <CustomReservation
          exitCustomResgister={exitCustomResgister}
          orderStep={orderStep}
          setStep={setStep}
          submitData={submitData}
          storeId={storeId}
        />
      )}
    </>
  );
};

export default ProfileCustomOrder;
