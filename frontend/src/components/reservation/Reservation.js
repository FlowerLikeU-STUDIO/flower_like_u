import { useState } from "react";
import styled from "styled-components";
import Calendar from "../calendar";
import { ButtonWrapper } from "../feeds/ContentForm";
import { ReservationButton } from "../feeds/FeedDetail";
import BackButton from "../modal/BackButton";

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

const Reservation = ({ onClick, sendReservation }) => {
  const [reservationContent, setReservationContent] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [choiceDay, setChoiceDay] = useState("");

  const submitReservation = () => {
    if (choiceDay === "") {
      alert("날짜를 선택해 주세요.");
      return;
    }
    if (reservationContent.length === 0) {
      alert("요구사항을 입력해주세요.");
      return;
    }
    sendReservation(reservationDate, reservationContent);
  };
  return (
    <>
      <ReservationWrapper>
        <BackButton onClick={onClick} />
        <Calendar
          setChoiceDay={setChoiceDay}
          choiceDay={choiceDay}
          setReservationDate={setReservationDate}
        />
      </ReservationWrapper>
      <ReservationWrapper className="contents">
        <div>🌻시간협의는 채팅을 통해 진행해주세요🌻</div>

        <TextAreaStyle
          placeholder="요구사항을 입력해주세요."
          value={reservationContent}
          onChange={(e) => setReservationContent(e.target.value)}
        />

        <ButtonWrapper>
          <ReservationButton onClick={submitReservation}>
            {"완료"}
          </ReservationButton>
        </ButtonWrapper>
      </ReservationWrapper>
    </>
  );
};

export default Reservation;
