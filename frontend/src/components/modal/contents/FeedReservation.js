import FeedDetail from "@/components/feeds/FeedDetail";
import Reservation from "@/components/reservation/Reservation";
import { modalClose } from "@/store/reducers/modal";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import CloseButton from "../CloseButton";

const FeedReservationWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
`;
const FeedReservation = ({ feed }) => {
  const [type, setType] = useState("detail");
  const dispatch = useDispatch();
  const changeType = (value) => {
    setType(value);
  };

  const sendReservation = async (day, content) => {
    const data = {
      id: feed.id,
      day: day,
      content: content,
    };
    console.log(data);
    // const res = await axios.post("url", data).then((res) => res.data);
    alert("예약이 완료되었습니다.");
    dispatch(modalClose());
  };
  return (
    <FeedReservationWrapper>
      {type === "detail" ? (
        <FeedDetail feed={feed} onClick={changeType} />
      ) : (
        <Reservation onClick={changeType} sendReservation={sendReservation} />
      )}
      <CloseButton />
    </FeedReservationWrapper>
  );
};

export default FeedReservation;
