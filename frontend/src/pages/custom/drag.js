import { useState } from "react";
import styles from "./drag.module.scss";
import classNames from "classnames/bind";

const Drag = () => {
  const cx = classNames.bind(styles);

  const circles = ["aquamarine", "rebeccapurple", "palevioletred"];

  const [circleStatus, setCircleStatus] = useState(0);
  const [boxStatus, setBoxStatus] = useState(0);
  const [catchCircle, setCatchCircle] = useState();

  const onDragStart = (e) => {
    console.log("잡았다!");
  };

  const onDragEnter = (e) => {
    console.log("들어왔다!");
    setCircleStatus(1);
  };

  const onDragOver = (e) => {
    console.log("지금 위에 있어!");
    setCircleStatus(1);
  };

  const onDragEnd = (e) => {
    if (circleStatus === 1) {
      console.log("잘했어!");
      setBoxStatus(1);
      setCatchCircle(e.currentTarget.dataset.position);
    } else if (circleStatus === 0) {
      console.log("다른 데 놓았어!");
    }
  };

  const onDragLeave = (e) => {
    console.log("나갔다!");
    setCircleStatus(0);
  };

  const onDrop = (e) => {
    console.log("??");
  };

  return (
    <div className={styles.background}>
      <div className={styles.flex}>
        {circles.map((title, index) => (
          <div
            key={index}
            className={cx(title)}
            draggable={true}
            data-position={title}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDrop={onDrop}
          >
            드래그 앤 드롭
          </div>
        ))}
      </div>

      <div
        className={
          circleStatus === 1 ? cx("drop", "onthebox") : boxStatus === 1 ? cx("drop", catchCircle) : styles.drop
        }
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        여기로 떨어트려 주세요
      </div>
    </div>
  );
};

export default Drag;
