import styles from "./RandomFlower.module.scss";
import { useDispatch, useSelector } from "react-redux";
import useCustom from "@/hooks/useCustom";
import { useState } from "react";
import { wrapper } from "../menu/MenuContents";
import {
  makeFlowerList,
  selectWrapperColor,
  selectRibbonColor,
} from "@/store/reducers/custom";
import { client } from "@/pages/api/client";

const RandomFlower = () => {
  const dispatch = useDispatch();
  const customOption = useSelector((state) => state.custom);

  // 랜덤 꽃다발
  //* 클릭했을 때만 api가 호출되도록 하기 위한 state
  // const [randomState, setRandomState] = useState(false);

  //* 현재 사이즈 값
  //* 포장지와 리본 랜덤을 위한 정수 생성
  const wrapperRandomNum = Math.floor(Math.random() * 6);
  const ribbonRandomNum = Math.floor(Math.random() * 6);

  //* hook
  // const { randomFlower } = useCustom();
  // const { flowerData, mutate } = randomFlower(size, randomState);

  //* api 요청
  const getRandom = async () => {
    let size = String(customOption.size * 2 + 1);
    if (customOption.size === 0) {
      size = "0";
    }
    const res = await client
      .get(`custom/recommend/${size}`)
      .then((res) => res.data);
    if (res) {
      console.log(res);
      const flowerList = customOption.flowers;
      const copyOfFlowerList = [...flowerList];
      copyOfFlowerList.map(
        (flower, index) => (copyOfFlowerList[index] = res[index].id)
      );
      dispatch(makeFlowerList(copyOfFlowerList));
      //* 꽃다발, 꽃풍선일 때에는 포장지, 리본 랜덤 생성
      if (customOption.package === 0) {
        dispatch(selectWrapperColor(wrapper[wrapperRandomNum].id));
        dispatch(selectRibbonColor(ribbonRandomNum));
      } else if (customOption.package === 2) {
        dispatch(selectWrapperColor(wrapper[wrapperRandomNum].id));
      }
    } else {
      alert("실패");
    }
  };

  //* state를 true로 변경해서 api 호출, 랜덤 값을 store에 업데이트
  // const onHandleRandom = () => {
  //   if (!flowerData) return;
  //   setRandomState(true);
  //   const flowerList = customOption.flowers;
  //   const copyOfFlowerList = [...flowerList];
  //   copyOfFlowerList.map(
  //     (flower, index) => (copyOfFlowerList[index] = flowerData[index].id)
  //   );
  //   dispatch(makeFlowerList(copyOfFlowerList));
  //   //* 꽃다발, 꽃풍선일 때에는 포장지, 리본 랜덤 생성
  //   if (customOption.package === 0) {
  //     dispatch(selectWrapperColor(wrapper[wrapperRandomNum].id));
  //     dispatch(selectRibbonColor(ribbonRandomNum));
  //   } else if (customOption.package === 2) {
  //     dispatch(selectWrapperColor(wrapper[wrapperRandomNum].id));
  //   }
  //   mutate();
  //   setRandomState(false);
  // };

  return (
    <button className={styles.recommend_menu} onClick={() => getRandom()}>
      랜덤
    </button>
  );
};

export default RandomFlower;
