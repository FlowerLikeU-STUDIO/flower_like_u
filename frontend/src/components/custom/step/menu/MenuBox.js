import MenuCard from "./MenuCard";
import { wrapper, ribbon, flower } from "./MenuContents";
import styles from "./MenuBox.module.scss";

const MenuBox = (props) => {
  if (props.tab === 0) {
    return (
      <div className={styles.card_wrapper}>
        <div className={styles.inner_wrapper}>
          {wrapper.map((color, index) => (
            <MenuCard
              key={wrapper[index].color}
              img={"/custom/custom_background.png"}
              title={wrapper[index].koname}
              contents={wrapper[index].contents}
              name={wrapper[index].color}
            />
          ))}
        </div>
      </div>
    );
  } else if (props.tab === 1) {
    return (
      <div className={styles.card_wrapper}>
        <div className={styles.inner_wrapper}>
          {ribbon.map((color, index) => (
            <MenuCard
              key={ribbon[index].color}
              img={"/custom/custom_background.png"}
              title={ribbon[index].koname}
              contents={ribbon[index].contents}
              name={ribbon[index].color}
            />
          ))}
        </div>
      </div>
    );
  } else if (props.tab === 2) {
    return (
      <div className={styles.card_wrapper}>
        <div className={styles.inner_wrapper}>
          {flower.map((name, index) => (
            <MenuCard
              key={`${flower[index].name}_${flower[index].color}`}
              img={`/custom/flower/${flower[index].color}_${flower[index].name}.png`}
              title={flower[index].koname}
              contents={flower[index].contents}
              index={index}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default MenuBox;
