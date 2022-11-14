import FlowerMenuCard from "./FlowerMenuCard";
import PackageMenuCard from "./PackageMenuCard";
import { wrapper, ribbon, flower } from "./MenuContents";
import styles from "./MenuBox.module.scss";

const MenuBox = (props) => {
  const tabList = [flower, wrapper, ribbon];
  const tab = tabList[props.tab];

  if (tab !== flower) {
    return (
      <div className={styles.card_wrapper}>
        <div className={styles.inner_wrapper}>
          {tab.map((color, index) => (
            <PackageMenuCard
              key={tab[index].color}
              hex={tab[index].hex}
              name={tab[index].name}
              description={tab[index].description}
              color={tab[index].color}
              tab={props.tab}
              index={index}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.card_wrapper}>
        <div className={styles.inner_wrapper}>
          {tab.map((name, index) => (
            <FlowerMenuCard
              key={`${tab[index].name}_${tab[index].color}`}
              img={`/custom/flower/${tab[index].color}_${tab[index].name}.png`}
              title={tab[index].title}
              description={tab[index].description}
              index={index}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default MenuBox;
