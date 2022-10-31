import styles from "./index.module.scss";
import Button from "@/styles/common/Button";

const Custom = () => {
  return (
    <main className={styles.custom_background}>
      <section className={styles.button_letter_wrapper}>
        <h1 className={styles.custom_title}>너를 닮은 꽃다발</h1>
        <h1 className={styles.custom_description}>
          커스텀한 꽃다발을 주변 꽃집에서 주문하면,
          <br />
          화훼 농가의 어려움에 도움이 됩니다. <br />
          당신을 닮은 꽃다발로
          <br />
          사람에게, 세상에게 당신의 마음을 전해주세요.
        </h1>
        <div className={styles.button_wrapper}>
          <div>
            <Button size="custom_small" link="/custom/step" color="mainPrimary">
              커스텀 시작하기
            </Button>
            {/* 내 커스텀 리스트가 보이는 모달 창 띄우기 */}
            <Button size="custom_small" color="mainPrimary">
              내 커스텀 사용하기
            </Button>
          </div>
          {/* 커스텀 방법이 나오는 모달 창 띄우기 */}
          <Button size="custom_large" color="white">
            커스텀하는 방법 알아보기
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Custom;
