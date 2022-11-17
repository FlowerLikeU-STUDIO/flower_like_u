import styles from "./index.module.scss";
import MainTop from "@/components/main/MainTop";
import classNames from "classnames/bind";
import HowUse from "@/components/main/HowUse";
import TopRatingFlorist from "@/components/main/TopRatingFlorist";
import FlowerLikeUs from "@/components/main/FlowerLikeUs";

const Home = () => {
  const cx = classNames.bind(styles);

  return (
    <main className={styles.main_wrapper}>
      <div className={styles.top_circle_wrapper}>
        <div className={cx("circle", "top")} />
      </div>
      <div className={cx("circle", "first")} />
      <div className={cx("circle", "second")} />
      <div className={cx("circle", "third")} />
      <div className={cx("circle", "fourth")} />
      <div className={cx("circle", "fifth")} />
      <MainTop />
      <HowUse />
      {/* <TopRatingFlorist /> */}
      {/* <FlowerLikeUs /> */}
    </main>
  );
};

export default Home;
