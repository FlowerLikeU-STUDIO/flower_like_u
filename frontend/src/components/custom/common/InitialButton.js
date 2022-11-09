import styles from "./InitialButton.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { makeFlowerList } from "@/store/reducers/custom";

const InitialButton = () => {
  const dispatch = useDispatch();
  const flowerList = useSelector((state) => state.custom.flowers);
  const flowerInitialHandler = () => {
    const copyOfFlowerList = [...flowerList];
    const newFlowerList = copyOfFlowerList.fill(0);
    dispatch(makeFlowerList(newFlowerList));
  };

  return (
    <button
      className={styles.initial_button}
      onClick={() => flowerInitialHandler()}
    >
      초기화
    </button>
  );
};

export default InitialButton;
