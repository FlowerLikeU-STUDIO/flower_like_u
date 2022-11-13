import styles from "./HowCustomize.module.scss";
import FlowerImg from "../common/FlowerImg";

const HowCustomize = () => {
  return (
    <article className={styles.contents_wrapper}>
      <h1 className={styles.title}>어떻게 커스텀하나요?</h1>
      <div className={styles.description_wrapper}>
        <p className={styles.description}>
          너를 닮은 꽃을 찾는 여정, <mark className={styles.mark}> 너닮꽃</mark>{" "}
          에 오신 것을 환영합니다! 🤗 <br />
          지금부터 커스텀하는 방법을 알려드릴게요!
        </p>
        <h2 className={styles.description_subtitle}>1. 포장 종류 고르기</h2>
        <div className={styles.img_wrapper}>
          <div className={styles.img_size}>
            <FlowerImg src={"/howcustom/step1.png"} />
          </div>
        </div>
        <p className={styles.description}>
          먼저 포장 종류를 골라주세요. <br />
          현재 커스텀할 수 있는 포장 종류로는
          <mark className={styles.mark}> 꽃다발, 꽃병, 꽃풍선 </mark>
          이 있답니다.
          <br />
          앞으로 더 많은 종류가 추가될 거에요! 😘
          <br />
          아래의 뒤로가기 버튼을 누르면 커스텀 메인 페이지로 돌아갈 수 있어요.
        </p>

        <h2 className={styles.description_subtitle}>2. 사이즈 고르기</h2>
        <div className={styles.img_wrapper}>
          <div className={styles.img_size}>
            <FlowerImg src={"/howcustom/step2.png"} />
          </div>
        </div>
        <p className={styles.description}>
          <mark className={styles.mark}> 너닮꽃 </mark>
          에서는 꽃 송이수에 따른 사이즈를 고를 수 있어요.
          <br />
          <mark className={styles.mark}>꽃다발 </mark>은 1송이부터 9송이까지,{" "}
          <br />
          <mark className={styles.mark}>꽃병 </mark>과
          <mark className={styles.mark}> 꽃풍선 </mark> 은 1송이부터 5송이까지
          고를 수 있답니다.
          <br />
          꽃의 아름다운 배치를 위해서, 홀수로 사이즈 종류가 준비되어 있어요!
        </p>

        <h2 className={styles.description_subtitle}>3. 커스텀하기</h2>
        <div className={styles.img_wrapper}>
          <div className={styles.img_size}>
            <FlowerImg src={"/howcustom/step3.png"} />
          </div>
        </div>
        <p className={styles.description}>
          이제 <mark className={styles.mark}> 너닮꽃 </mark>
          의 커스텀 페이지에요! 🎉
          <br />
          커스텀 페이지에서는 지금까지 고른 포장지와 사이즈를 바탕으로 커스텀을
          할 수 있어요.
          <br />
          <mark className={styles.mark}>꽃다발 </mark>에서는 꽃, 포장지, 리본을
          고를 수 있고
          <br />
          <mark className={styles.mark}>꽃풍선 </mark>에서는 꽃, 포장지 그리고
          <mark className={styles.mark}> 꽃병 </mark>에서는 꽃을 고를 수 있어요.
          <br />
          <br />
          꽃을 <mark className={styles.mark}> 드래그 앤 드롭 </mark>으로
          이동해서 꽃다발 위에 올려놓아 보세요! 선택한 꽃으로 꽃다발이
          채워진답니다 🥰
          <br />
          <br />
          포장지 색깔과 리본 종류는 <mark className={styles.mark}> 클릭 </mark>
          으로 선택할 수 있어요. 예쁜 색조합을 찾아 보세요 🎨🧐
          <br />
          <br />
          간편한 커스텀을 하고 싶으신가요? <br />
          화면 왼쪽의 <mark className={styles.mark}> 랜덤 </mark>버튼을 누르면
          색 조합과 위치를 고려해서 예쁜 꽃과 포장을 랜덤하게 추천해줘요!
          <br />
          <br />
          <mark className={styles.mark}> 꽃말 </mark> 버튼을 클릭하면 꽃의
          꽃말을 확인할 수 있어요! <br />
          <mark className={styles.mark}> 채우기 </mark> 버튼으로 원하는 꽃으로
          꽃다발을 간편하게 채워 보세요 😊
          <br />
          <br />
          꽃 선물이 처음이라 뭘 선물해야 할지 모르시겠다구요?
          <br />
          <mark className={styles.mark}> 레시피 </mark> 버튼을 눌러서 상황별
          추천 꽃 조합을 확인해 보세요!
          <br />
          당신의 센스있는 선물을 도와드려요 🎁
          <br />
          <br />
          마지막으로, 지금까지 커스텀한 게 마음에 안 드시나요? 😥
          <br />
          그렇다면 초기화 버튼으로 커스텀 내용을 초기화할 수 있답니다!
          <br />
          <br />
          혹시 이전 단계로 돌아가고 싶다면, 화면 상단의 헤더에서 단계 버튼을
          클릭해 보세요!
          <br />
          이전 단계로 돌아갈 수 있답니다 😎
        </p>

        <h2 className={styles.description_subtitle}>4. 완성하기</h2>
        <div className={styles.img_wrapper}>
          <div className={styles.img_size}>
            <FlowerImg src={"/howcustom/step4.png"} />
          </div>
        </div>
        <p className={styles.description}>
          여기까지 오느라 수고하셨습니다! 나만의 꽃다발을 완성하셨네요 🎊
          축하해요!!
          <br />
          <mark className={styles.mark}>카카오톡 공유하기 </mark>버튼으로 커스텀
          꽃다발을 공유할 수 있어요.
          <br />
          <mark className={styles.mark}>사진으로 저장하기 </mark>버튼으로 커스텀
          레시피도 함께 사진으로 저장할 수 있답니다! ✨
          <br />
          <br />
          <mark className={styles.mark}>너닮꽃 </mark>서비스에 가입해서
          로그인하면, 주변 꽃집에 커스텀 꽃다발을 주문할 수 있어요.
          <br />
          꽃다발이 원하는 대로 안 만들어질까봐 걱정이신가요? <br />
          <mark className={styles.mark}>너닮톡 </mark>채팅 서비스와 함께라면
          계속해서 꽃집 사장님과 소통할 수 있답니다😚
          <br />
          <br />
          <mark className={styles.mark}>초기화하고 메인으로 돌아가기 </mark>
          버튼을 누르면 커스텀 내용이 모두 초기화되니 신중하게 눌러주세요!
        </p>
      </div>
    </article>
  );
};

export default HowCustomize;
