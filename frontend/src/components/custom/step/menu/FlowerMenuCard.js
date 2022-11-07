import Image from "next/image";
import styles from "./FlowerMenuCard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { makeFlowerList, makeCurrentFlower, makeCurrentLocation } from "@/store/reducers/custom";

//* img, title, contents
const FlowerMenuCard = (props) => {
  const dispatch = useDispatch();
  const current_location = useSelector((state) => state.custom.current_location);
  const flowerList = useSelector((state) => state.custom.flowers);

  // 드래그 앤 드롭
  //* 드래그를 시작할 때 current_flower에 드래그로 잡은 꽃의 인덱스를 넣어줍니다.
  const onDragStart = (e) => {
    //* 드래그가 되고 있는 이미지는 반투명하게 처리 (카드 안)
    const whichFlower = e.target;
    whichFlower.style.opacity = "0.3";
    //* 이미지를 잡는 곳을 중앙으로 설정
    e.dataTransfer.setDragImage(whichFlower, 42, 42);
    dispatch(makeCurrentFlower(e.currentTarget.dataset.position));
  };

  //* 새로운 꽃 리스트로 store를 업데이트하는 함수
  const flowerIndex = useSelector((state) => state.custom.current_flower);
  const flowerLocation = useSelector((state) => state.custom.current_location);
  const upDateFlowerList = () => {
    const newList = [];
    for (let i = 0; i < flowerList.length; i++) {
      if (i === parseInt(flowerLocation)) {
        newList.push(parseInt(flowerIndex));
      } else {
        newList.push(flowerList[i]);
      }
    }
    dispatch(makeFlowerList(newList));
  };

  //* 드래그를 끝내고 드롭했을 때
  const onDragEnd = (e) => {
    const whichFlower = e.target;
    whichFlower.style.opacity = "1";
    if (current_location !== null) {
      //* 새로운 꽃 리스트로 업데이트합니다.
      upDateFlowerList();
      //* current_flower, current_location을 초기화합니다.
      dispatch(makeCurrentLocation(null));
      dispatch(makeCurrentFlower(null));
    } else if (current_location === null) {
      dispatch(makeCurrentLocation(null));
      dispatch(makeCurrentFlower(null));
    }
  };

  return (
    <div className={styles.menu_card_wrapper}>
      <Image
        src={props.img}
        className={styles.menu_image}
        width={88}
        height={88}
        draggable={true}
        data-position={props.index}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      ></Image>
      <div className={styles.letter_wrapper}>
        <h1 className={styles.menu_title}>{props.title}</h1>
        <span className={styles.menu_contents}>{props.contents}</span>
      </div>
    </div>
  );
};

export default FlowerMenuCard;
