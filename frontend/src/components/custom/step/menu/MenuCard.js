import Image from "next/image";
import styles from "./MenuCard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  makeFlowerList,
  makeCurrentFlower,
  makeCurrentLocation,
} from "@/store/reducers/custom";

//* img, title, contents
const MenuCard = (props) => {
  const dispatch = useDispatch();
  const current_location = useSelector(
    (state) => state.custom.current_location
  );
  let flowerList = useSelector((state) => state.custom.flowers);

  // 드래그 앤 드롭
  //* 드래그를 시작할 때
  const onDragStart = (e) => {
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
    if (current_location !== null) {
      //* 새로운 꽃 리스트로 업데이트한다.
      upDateFlowerList();
      //* 최근에 선택한 꽃과 드롭한 위치를 초기화한다.
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

export default MenuCard;
