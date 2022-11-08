import styles from "./MainTop.module.scss";
import FlowerImg from "../common/FlowerImg";
import classNames from "classnames/bind";
import { useRouter } from "next/router";

const MainTop = () => {
  const router = useRouter();
  const cx = classNames.bind(styles);
  const content =
    "꽃다발을 주변 꽃집에서 주문하면, \n  화훼 농가의 어려움에 도움이 됩니다. \n  당신을 닮은 꽃다발로 \n  사람에게, 세상에게 당신의 마음을 전해주세요.";

  const iconContent = [
    "당신은 어떤 꽃을 닮았을까요? \n  너를 닮은 꽃의 커스텀 기능으로 \n 당신이 좋아하는, 당신을 닮은 꽃을 찾아보세요.",
    "너닮꽃의 채팅 기능을 통해서 \n 꽃집 또는 고객과 소통해보세요. \n 당신을 닮은 꽃을 찾는 데 도움이 될 거에요.",
    "꽃집을 운영하고 계신가요? \n 너를 닮은 꽃에 가게를 등록하고,\n 자신만의 작품으로 피드를 아름답게 꾸며보세요.",
    "어떤 꽃집을 가야 할지, 너무 비싸진 않을지 걱정되시나요? \n 너닮꽃의 플로리스트들의 피드와 후기를 구경해보세요. \n 당신의 취향에 맞는 플로리스트가 있을 거에요.",
  ];

  return (
    <section className={styles.top_wrapper}>
      <div>
        <div className={styles.top_contents_wrapper}>
          <h1 className={styles.main_title}>너를 닮은 꽃</h1>
        </div>
        <section className={styles.card_bouquet_wrapper}>
          <section className={cx("card_wrapper", "right_align")}>
            <article className={styles.card}>
              <div className={styles.main_icon}>
                <FlowerImg src="/home/1.png" alt={"너닯꽃 아이콘 1"} />
              </div>
              <span className={styles.card_content}>{iconContent[0]}</span>
            </article>
            <article className={cx("card", "second")}>
              <div className={styles.main_icon}>
                <FlowerImg src="/home/2.png" alt={"너닯꽃 아이콘 2"} />
              </div>
              <span className={styles.card_content}>{iconContent[1]}</span>
            </article>
          </section>
          <div className={styles.bouquet_wrapper}>
            <div className={styles.main_bouquet}>
              <FlowerImg src={"/home/bouquet.png"} alt={"너닯꽃 bouquet"} />
              <button
                className={styles.arrow_box}
                onClick={() => router.push("/custom")}
              >
                커스텀하러 가기
              </button>
            </div>
          </div>
          <section className={cx("card_wrapper", "left_align")}>
            <article className={styles.card}>
              <div className={styles.main_icon}>
                <FlowerImg src="/home/3.png" alt={"너닯꽃 아이콘 3"} />
              </div>
              <span className={styles.card_content}>{iconContent[2]}</span>
            </article>
            <article className={styles.card}>
              <div className={styles.main_icon}>
                <FlowerImg src="/home/4.png" alt={"너닯꽃 아이콘 4"} />
              </div>
              <span className={styles.card_content}>{iconContent[3]}</span>
            </article>
          </section>
        </section>
      </div>
    </section>
  );
};

export default MainTop;
