import styles from "./SituationContents.module.scss";
import FlowerImg from "@/components/common/FlowerImg";
import { RecipeContents } from "../RecipeContents";
import { flower } from "../../menu/MenuContents";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  selectPackage,
  selectSize,
  makeFlowerList,
  selectWrapperColor,
  selectRibbonColor,
} from "@/store/reducers/custom";

const SituationContents = ({ setModalOpen }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const useRecipe = (pack, size, wrapper, ribbon, flowers) => {
    router.push("/custom/step");
    dispatch(selectPackage(pack));
    dispatch(selectSize(size));
    dispatch(selectWrapperColor(wrapper));
    dispatch(selectRibbonColor(ribbon));
    dispatch(makeFlowerList(flowers));
    setModalOpen(false);
  };

  return (
    <article className={styles.contents_wrapper}>
      <h1 className={styles.title}>너를 닮은 꽃 레시피</h1>
      <div className={styles.card_wrapper}>
        {RecipeContents.map((recipe, index) => (
          <article className={styles.card} key={index}>
            <div className={styles.title_button_wrapper}>
              <h1>{recipe.title}</h1>
              <button
                className={styles.button}
                onClick={() => useRecipe(recipe.package, recipe.size, recipe.wrapper, recipe.ribbon, recipe.flowers)}
              >
                사용하기
              </button>
            </div>
            <h2>{recipe.description}</h2>
            <div className={styles.image_wrapper}>
              {recipe.flower_kind.map((flowerIndex, index) => (
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

export default SituationContents;
