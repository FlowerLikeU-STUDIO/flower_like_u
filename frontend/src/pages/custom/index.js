import styles from "./index.module.scss";
import Button from "@/components/common/Button";
import CustomModal from "@/components/custom/common/CustomModal";
import { useState } from "react";
import { useRouter } from "next/router";
import FailAlert from "@/lib/FailAlert";
// 로그인 여부
import useSWR from "swr";
import storage from "@/lib/utils/storage";

const Custom = () => {
  const router = useRouter();
  const { data: isLogin } = useSWR("logIn", storage);

  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 종류 state
  const [modalId, setModalId] = useState(0);

  // 모달창 노출
  const showModal = () => {
    setModalOpen(!modalOpen);
  };

  // 내 커스텀 사용하기
  const useMyDesign = () => {
    isLogin
      ? router.push("/mypage/design/")
      : FailAlert("로그인한 유저만 사용할 수 있어요!");
  };

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
            <Button
              size="custom_small"
              color="mainPrimary"
              onClick={() => {
                showModal();
                setModalId(2);
              }}
            >
              너닮꽃 꽃다발 레시피
            </Button>
            {/* 내 커스텀 리스트가 보이는 모달 창 띄우기 */}
            <Button
              size="custom_small"
              color="mainPrimary"
              onClick={() => useMyDesign()}
            >
              내 커스텀 사용하기
            </Button>
          </div>
          <Button size="custom_large" color="white" link="/custom/step">
            &nbsp; &nbsp;&nbsp;커스텀 시작하기&nbsp;&nbsp;&nbsp;
          </Button>
          <Button
            size="custom_large"
            color="mainPrimary"
            onClick={() => {
              showModal();
              setModalId(3);
            }}
          >
            커스텀하는 방법 알아보기
          </Button>
          {modalOpen && (
            <CustomModal setModalOpen={setModalOpen} id={modalId} />
          )}
        </div>
      </section>
    </main>
  );
};

export default Custom;
