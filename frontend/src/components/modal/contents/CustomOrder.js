import CustomFlorist from "@/components/custom/order/CustomFlorist";
import CustomReservation from "@/components/custom/order/CustomReservation";
import { useState } from "react";

const CustomOrder = ({ orderStep }) => {
  const [step, setStep] = useState(orderStep);

  return <>{step === "florist" ? <CustomFlorist setStep={setStep} /> : <CustomReservation setStep={setStep} />}</>;
};

export default CustomOrder;
