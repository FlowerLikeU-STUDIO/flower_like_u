import styles from "./index.module.scss";
import MainTop from "@/components/main/MainTop";
import classNames from "classnames/bind";
import HowUse from "@/components/main/HowUse";
import TopRatingFlorist from "@/components/main/TopRatingFlorist";
import FlowerLikeUs from "@/components/main/FlowerLikeUs";
import useSWR from "swr";
import { client } from "./api/client";

const Home = ({ topRating }) => {
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
      <TopRatingFlorist topRating={topRating} />
      {/* <FlowerLikeUs /> */}
    </main>
  );
};

export default Home;

export async function getServerSideProps() {
  const data = await fetch(
    `https://www.flowerlikeu.com/api/user/stores?page=1&size=4&sort=rating`
  ).then((res) => res.json());

  return {
    props: {
      topRating: data.result === "success" ? data.storeInfo.list : [],
    },
  };
}
