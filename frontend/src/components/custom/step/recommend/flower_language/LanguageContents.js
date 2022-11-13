import styles from "./LanguageContents.module.scss";
import { flower } from "../../menu/MenuContents";
import FlowerImg from "@/components/common/FlowerImg";
import { useDispatch, useSelector } from "react-redux";
import { makeFlowerList } from "@/store/reducers/custom";

const LanguageContents = ({ setModalOpen }) => {
  const dispatch = useDispatch();

  //* 선택한 꽃으로 채우기
  const flowerList = useSelector((state) => state.custom.flowers);
  const copyOfFlowerList = [...flowerList];
  const onFillFlower = (num) => {
    copyOfFlowerList.map((flower, index) => (copyOfFlowerList[index] = num));
    dispatch(makeFlowerList(copyOfFlowerList));
  };

  //* 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <article className={styles.contents_wrapper}>
      <h1 className={styles.title}>너를 닮은 꽃말</h1>
      <div className={styles.card_wrapper}>
        {flower.map((flower, index) => (
          <article className={styles.card} key={index}>
            <div className={styles.img_wrapper}>
              <FlowerImg
                src={`/custom/flower/${flower.color}_${flower.name}.png`}
              />
            </div>
            <div className={styles.card_content_wrapper}>
              <h1>{flower.title}</h1>
              <h2>{flower.language}</h2>
            </div>
            <div className={styles.button_wrapper}>
              <button
                className={styles.card_button}
                onClick={() => {
                  onFillFlower(index);
                  closeModal();
                }}
              >
                채우기
              </button>
            </div>
          </article>
        ))}
      </div>
    </article>
  );
};

export default LanguageContents;
