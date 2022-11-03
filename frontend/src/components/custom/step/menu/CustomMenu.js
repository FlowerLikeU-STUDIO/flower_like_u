import styles from "./CustomMenu.module.scss";
import MenuBox from "./MenuBox";
import { useState } from "react";

const CustomMenu = () => {
  const [tabStatus, setTabStatus] = useState(0);

  const tabHandler = (tab) => {
    setTabStatus(tab);
  };

  return (
    <section className={styles.custom_menu_wrapper}>
      <div className={styles.tabbar_wrapper}>
        <button className={styles.tabbar_button} onClick={() => tabHandler(0)}>
          <p className={styles.tabbar_menu}>포장지</p>
        </button>
        <button className={styles.tabbar_button} onClick={() => tabHandler(1)}>
          <p className={styles.tabbar_menu}>리본</p>
        </button>
        <button className={styles.tabbar_button} onClick={() => tabHandler(2)}>
          <p className={styles.tabbar_menu}>꽃</p>
        </button>
      </div>
      <div className={styles.line} />
      <MenuBox tab={tabStatus} />
    </section>
  );
};

export default CustomMenu;
