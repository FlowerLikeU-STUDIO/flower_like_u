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
              title={tab[index].title}
              contents={tab[index].contents}
              name={tab[index].color}
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
              contents={tab[index].contents}
              index={index}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default MenuBox;
