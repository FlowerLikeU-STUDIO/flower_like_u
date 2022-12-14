import FeedDetail from "@/components/feeds/FeedDetail";
import Reservation from "@/components/reservation/Reservation";
import storage from "@/lib/utils/storage";
import { client } from "@/pages/api/client";
import { modalClose } from "@/store/reducers/modal";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useSWR from "swr";
import CloseButton from "../CloseButton";

const FeedReservationWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
`;
const FeedReservation = ({ feedId, storeId }) => {
  const [type, setType] = useState("detail");
  const [feed, setFeed] = useState(null);
  const { data: isLogin } = useSWR("logIn", storage);

  const fetchTargetFeed = async () => {
    const res = await client
      .get(`feed/detail/${feedId}`)
      .then((res) => res.data.feedInfo);
    setFeed({ ...res });
  };
  useEffect(() => {
    fetchTargetFeed();
  }, []);
  const dispatch = useDispatch();
  const changeType = (value) => {
    setType(value);
  };

  const sendReservation = async (date, content) => {
    if (!isLogin) {
      alert("로그인 이후 예약 가능합니다.");
      return;
    }
    const data = {
      storeId: storeId,
      feedId: feedId,
      dueDate: date,
      request: content,
    };
    const res = await client.post("book/feed", data).then((res) => res);
    if (res.status === 201) {
      alert("예약이 완료되었습니다.");
    }

    dispatch(modalClose());
  };

  return (
    <>
      {feed ? (
        <FeedReservationWrapper>
          {type === "detail" ? (
            <FeedDetail feed={feed} onClick={changeType} />
          ) : (
            <Reservation
              onClick={changeType}
              sendReservation={sendReservation}
              storeId={storeId}
            />
          )}
          <CloseButton />
        </FeedReservationWrapper>
      ) : (
        <></>
      )}
    </>
  );
};

export default FeedReservation;
