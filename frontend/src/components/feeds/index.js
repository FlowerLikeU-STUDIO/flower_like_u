import styled from "styled-components";
import axios from "axios";
import useSWRInfinite from "swr/infinite";
import Image from "next/image";

import React, { useMemo, useState } from "react";
import Modal from "@/components/modal";
import useIntersect from "@/hooks/useIntersect";
import FeedReservation from "../modal/contents/FeedReservation";
import { useDispatch, useSelector } from "react-redux";
import { modalOpen } from "@/store/reducers/modal";
import FeedRegister from "../modal/contents/FeedRegister";
import { client } from "@/pages/api/client";
const FeedWrapper = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 68px);
`;

const FeedListWrapper = styled.div`
  display: grid;
  margin: 0 auto;
  width: 80%;
  max-width: 920px;
  height: auto;
  /* min-height: 100vh; */
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  place-items: center;
  row-gap: 10px;
  column-gap: 10px;
  @media screen and (max-width: 556px) {
    row-gap: 1px;
    column-gap: 4px;
  }
`;
const Target = styled.div`
  height: 1px;
  width: 80%;
`;

const FeedItemWrapper = styled.div`
  cursor: pointer;
`;

const PAGE_SIZE = 9;
const fetcher = (url) => client.get(url).then((res) => res);
const Feed = ({ storeId }) => {
  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (index) => `feed/${storeId}?page=${index + 1}&size=${PAGE_SIZE}`,
    fetcher
  );
  const isOpen = useSelector((state) => state.modal.isOpen);
  const lastPage = useMemo(() => {
    return data ? data[0].data.feedInfo.maxPage : 0;
  }, [data]);

  const dispatch = useDispatch();
  const [targetFeed, setTargetFeed] = useState("");

  const feedList = useMemo(() => {
    let feedList = [];
    if (data) {
      data.map((item) => {
        // feedList.push(item.data.feedInfo.list);
        feedList = feedList.concat(...item.data.feedInfo.list);
      });
      return feedList;
    }
  }, [size, data]);
  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (size < lastPage && !isValidating) {
      setSize(size + 1);
    }
  });
  const onHandleOpen = (feed) => {
    setTargetFeed(feed.feedId);
    dispatch(modalOpen());
  };
  return (
    <>
      {isOpen ? (
        <>
          <Modal children={targetFeed !== "" ? <FeedReservation feedId={targetFeed} /> : <></>} />
        </>
      ) : (
        <></>
      )}
      <FeedWrapper>
        {feedList ? (
          <>
            <FeedListWrapper>
              {feedList.map((feed, index) => (
                <Feed.Item
                  feed={feed}
                  index={index}
                  key={(Number.MAX_SAFE_INTEGER & feed.feedId).toString(2).padStart(53, 0) + feed.name}
                  onClick={onHandleOpen}
                />
              ))}
            </FeedListWrapper>
            <Target ref={ref} />
          </>
        ) : (
          <>Loading</>
        )}
      </FeedWrapper>
    </>
  );
};

const areEqual = (prevProps, nextProps) => {
  parseInt(prevProps.feed.feedId) === parseInt(nextProps.feed.feedId) ? true : false;
};

const FeedItem = ({ feed, index, onClick }) => {
  return (
    <FeedItemWrapper key={feed.feedId + feed.title}>
      <Image src={feed.image} width={300} height={300} onClick={() => onClick(feed)} />
    </FeedItemWrapper>
  );
};

Feed.Item = React.memo(FeedItem, areEqual);
export default Feed;
