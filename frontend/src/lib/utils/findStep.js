import { useSelector } from "react-redux";

const findStep = () => {
  const stepState = useSelector((state) => state.custom);
  if (stepState.package === null && stepState.size === null) {
    return "package";
  } else if (stepState.package !== null && stepState.size === null) {
    return "size";
  } else if (stepState.package !== null && stepState.size !== null) {
    return "custom";
  }
};

export default findStep;
