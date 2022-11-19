import styles from "./HowUse.module.scss";
import FlowerImg from "../common/FlowerImg";

const HowUse = () => {
  const howuseContent = [
    "당신을 닮은 꽃다발을 찾는 여정, 너닮꽃에 와주셔서 감사해요.\n 너닮꽃에서는 꽃집 피드를 통해서 꽃을 고를 수 있고, \n 커스텀 꽃다발 기능으로  \n당신을 닮은 꽃다발을 직접 그려볼 수 있어요.",
    "아직 꽃을 사기에는 마음의 준비가 안 되셨나요? \n    그렇다면 너닮꽃의 꽃다발 커스텀 기능을 통해서\n    당신만의 꽃다발 레시피를 만들어 공유해 보세요. \n당신의 취향을 찾을지도 몰라요!",
    "그동안 꽃을 살 때 가격을 물어봐야 해서 곤란하셨나요? \n    너닮꽃에 등록된 플로리스트분들의 피드에서 \n    꽃들의 가격을 바로바로 확인해 보세요! \n    당신의 구매를 더 편안하게 만들어 드립니다.",
    "꽃집 등록을 하시려면, 사업자 등록증이 필요해요! \n 사업자 등록증과 상호명, 위치를 회원가입 할 때 기입해주시면 \n 너닮꽃에서 사업자용 프로필을 만들어 드려요.",
    "사업자용 프로필 페이지의 가게 소개란에서 \n    사업자님이 자신있는 작품을 어필해보세요! \n    작품을 더 잘 판매하고 전시할 수 있는 피드가 있어요.",
    "들어온 주문은 프로필 페이지에서 볼 수 있어요! \n    고객들과 더 쉽고 빠르게 연결될 수 있는, \n    너닮꽃의 채팅 서비스를 이용해 보세요. \n    주문이 완료될 때까지 고객관리를 할 수 있답니다.",
  ];

  return (
    <section className={styles.howuse_wrapper}>
      <h1 className={styles.howuse_title}>너닮꽃이 뭔가요?</h1>
      <section className={styles.howuse_contents_wrapper}>
        <section className={styles.article_wrapper}>
          <h2 className={styles.howuse_subtitle}>꽃을 사고 싶어요!</h2>
          <article className={styles.content_img_wrapper}>
            <div className={styles.howuse_icon}>
              <FlowerImg src="/home/5.png" alt={"너닯꽃 아이콘 5"} />
            </div>
            <span className={styles.howuse_content}>{howuseContent[0]}</span>
          </article>
          <article className={styles.content_img_wrapper}>
            <div className={styles.howuse_icon}>
              <FlowerImg src="/home/6.png" alt={"너닯꽃 아이콘 6"} />
            </div>
            <span className={styles.howuse_content}>{howuseContent[1]}</span>
          </article>
          <article className={styles.content_img_wrapper}>
            <div className={styles.howuse_icon}>
              <FlowerImg src="/home/7.png" alt={"너닯꽃 아이콘 7"} />
            </div>
            <span className={styles.howuse_content}>{howuseContent[2]}</span>
          </article>
        </section>
        <section className={styles.article_wrapper}>
          <h2 className={styles.howuse_subtitle}>꽃을 팔고 싶어요!</h2>
          <article className={styles.content_img_wrapper}>
            <div className={styles.howuse_icon}>
              <FlowerImg src="/home/8.png" alt={"너닯꽃 아이콘 8"} />
            </div>
            <span className={styles.howuse_content}>{howuseContent[3]}</span>
          </article>
          <article className={styles.content_img_wrapper}>
            <div className={styles.howuse_icon}>
              <FlowerImg src="/home/9.png" alt={"너닯꽃 아이콘 9"} />
            </div>
            <span className={styles.howuse_content}>{howuseContent[4]}</span>
          </article>
          <article className={styles.content_img_wrapper}>
            <div className={styles.howuse_icon}>
              <FlowerImg src="/home/10.png" alt={"너닯꽃 아이콘 10"} />
            </div>
            <span className={styles.howuse_content}>{howuseContent[5]}</span>
          </article>
        </section>
      </section>
    </section>
  );
};

export default HowUse;
