import styles from "./CustomReservation.module.scss";
import { modalClose } from "@/store/reducers/modal";
import { useDispatch } from "react-redux";
import Calendar from "@/components/calendar";
import styled from "styled-components";
import { useState } from "react";
import { ButtonWrapper } from "@/components/feeds/ContentForm";
import { ReservationButton } from "@/components/feeds/FeedDetail";

const ReservationWrapper = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
  &.contents {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const TextAreaStyle = styled.textarea`
  resize: none;
  width: 80%;
  border: 1px solid #b7b7b7;
  height: 180px;
  margin: 20px;
  padding: 10px;
`;
const CustomReservation = ({
  setStep,
  submitData,
  storeId,
  orderStep,
  exitCustomResgister,
}) => {
  const [reqeust, setRequest] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [choiceDay, setChoiceDay] = useState("");
  const dispatch = useDispatch();

  const closeModal = () => {
    if (orderStep === "flower") {
      exitCustomResgister();
    } else {
      dispatch(modalClose());
    }
  };

  const goReservation = () => {
    if (orderStep === "flower") {
      setStep("flower");
    } else {
      setStep("florist");
    }
  };

  const submitOrder = () => {
    if (choiceDay === "") {
      alert("날짜를 선택해 주세요.");
      return;
    }
    if (reqeust.length === 0) {
      alert("요구사항을 입력해주세요.");
      return;
    }
    submitData(reservationDate, reqeust);
  };

  return (
    <section className={styles.container}>
      <div className={styles.button_wrapper}>
        <button className={styles.close} onClick={closeModal}>
          <span className="material-icons-outlined">close</span>
        </button>
      </div>
      <article className={styles.contents_wrapper}>
        <h1>커스텀 주문 예약 모달 컨텐츠</h1>
        <div
          className={styles.florist_wrapper}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Calendar
            setChoiceDay={setChoiceDay}
            choiceDay={choiceDay}
            setReservationDate={setReservationDate}
            storeId={storeId}
          />
          <ReservationWrapper className="contents">
            <div>🌻시간협의는 채팅을 통해 진행해주세요🌻</div>
            <TextAreaStyle
              placeholder="요구사항을 입력해주세요."
              value={reqeust}
              onChange={(e) => setRequest(e.target.value)}
            />
            <ButtonWrapper>
              <ReservationButton onClick={submitOrder}>
                {"완료"}
              </ReservationButton>
            </ButtonWrapper>
          </ReservationWrapper>
        </div>
      </article>
      <button onClick={goReservation}>돌아가기</button>
    </section>
  );
};

export default CustomReservation;
