import styles from "./ColorContents.module.scss";
import { ColorRecipeContents } from "../RecipeContents";
import { flower } from "../../menu/MenuContents";
import { useDispatch, useSelector } from "react-redux";
import FlowerImg from "@/components/common/FlowerImg";
import { makeFlowerList, selectWrapperColor, selectRibbonColor } from "@/store/reducers/custom";

const ColorContents = ({ setModalOpen }) => {
  const dispatch = useDispatch();
  const customOption = useSelector((state) => state.custom);

  //* 설정된 포장지, 리본 값 / 선택한 색깔 꽃으로 현재 옵션에 맞게 채워주기
  const useColorRecipe = (wrapper, ribbon, flower) => {
    if (customOption.package === 0) {
      dispatch(selectWrapperColor(wrapper));
      dispatch(selectRibbonColor(ribbon));
    } else if (customOption.package === 2) {
      dispatch(selectWrapperColor(wrapper));
    }
    let copyOfFlowerList = [...customOption.flowers];
    for (let i = 0; i < copyOfFlowerList.length; i++) {
      copyOfFlowerList[i] = flower[Math.floor(Math.random() * flower.length)];
    }
    dispatch(makeFlowerList(copyOfFlowerList));
    setModalOpen(false);
  };

  return (
    <article className={styles.contents_wrapper}>
      <h1 className={styles.title}>너닮꽃 컬러 레시피</h1>
      <div className={styles.card_wrapper}>
        {ColorRecipeContents.map((recipe, index) => (
          <article className={styles.card} key={index}>
            <div className={styles.title_button_wrapper}>
              <h1 className={styles.card_title}>{recipe.title}</h1>
              <button
                className={styles.button}
                onClick={() => useColorRecipe(recipe.wrapper, recipe.ribbon, recipe.flower)}
              >
                사용하기
              </button>
            </div>
            <div className={styles.image_wrapper}>
              {recipe.flower.map((flowerIndex, index) => (
                <article className={styles.flower_image_wrapper} key={index}>
                  <div className={styles.card_image}>
                    <FlowerImg src={`/custom/flower/${flower[flowerIndex].color}_${flower[flowerIndex].name}.png`} />
                  </div>
                  <h3>{flower[flowerIndex].title}</h3>
                  <p>{flower[flowerIndex].language}</p>
                </article>
              ))}
            </div>
          </article>
        ))}
      </div>
    </article>
  );
};

export default ColorContents;
