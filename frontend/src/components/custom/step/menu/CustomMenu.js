import styles from "./CustomMenu.module.scss";
import MenuBox from "./MenuBox";
import { useState } from "react";
import { useSelector } from "react-redux";

const CustomMenu = () => {
  const [tabStatus, setTabStatus] = useState(0);
  const customOption = useSelector((state) => state.custom.package);
  let tabMenu = [];
  customOption === 0
    ? (tabMenu = ["꽃", "포장지", "리본"])
    : customOption === 1
    ? (tabMenu = ["꽃"])
    : (tabMenu = ["꽃", "포장지"]);

  const tabHandler = (tab) => {
    setTabStatus(tab);
  };

  return (
    <section className={styles.custom_menu_wrapper}>
      <div className={styles.tabbar_wrapper}>
        {tabMenu.map((title, index) => (
          <button key={title} className={styles.tabbar_button} onClick={() => tabHandler(index)}>
            <p className={styles.tabbar_menu}>{title}</p>
          </button>
        ))}
      </div>
      <div className={styles.line} />
      <MenuBox tab={tabStatus} />
    </section>
  );
};

export default CustomMenu;
