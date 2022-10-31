import { useRouter } from "next/router";
import CustomHeader from "@/components/custom/common/CustomHeader";
import SelectPackage from "@/components/custom/step/SelectPackage";
import SelectSize from "@/components/custom/step/SelectSize";
import BuoquetCustom from "@/components/custom/step/BouquetCustom";

const CustomStep = () => {
  const router = useRouter();
  const { customstep = [] } = router.query;
  return (
    <>
      <CustomHeader />
      {customstep[0] === "package" ? (
        <SelectPackage />
      ) : customstep[0] === "size" ? (
        <SelectSize package={customstep[1]} />
      ) : customstep[0] === "bouquet" ? (
        <BuoquetCustom />
      ) : (
        <p>잘못된 접근입니다.</p>
      )}
    </>
  );
};

export default CustomStep;
