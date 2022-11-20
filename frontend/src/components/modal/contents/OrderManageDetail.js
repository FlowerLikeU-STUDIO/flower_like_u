import { client } from "@/pages/api/client";
import useSWR from "swr";
import styles from "@/components/mypage/ResDetail.module.scss";
import ProfileImage from "@/components/common/ProfileImage";
import FlowerImg from "@/components/common/FlowerImg";
import styled from "styled-components";

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 0px;
  right: 10px;
`;

const OrderManageDetailWrapper = styled.div`
  position: relative;
`;

const OrderButtonWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  right: 10px;
`;

const ButtonStyle = styled.button`
  padding: 12px;
  width: 140px;
  color: white;
  margin: 0px 4px;
  border-radius: 4px;
  background-color: #ffa7a5;
`;
const bunchList = { XS: 1, S: 3, M: 5, L: 7, XL: 9 };
const fetcher = (url) => client.get(url).then((res) => res.data);
const OrderManageDetail = ({ bookId, closeModal }) => {
  const { data } = useSWR(`book/detail/${bookId}`, fetcher);

  const changeOrderStatus = async () => {
    const res = await client.put(`book/${bookId}`).then((res) => res);
    if (res.data.result === "success") {
      closeModal();
      return;
    }
  };

  const renderButton = () => {
    if (data.bookInfo.basics.state === "waited") {
      return (
        <ButtonStyle type="button" onClick={changeOrderStatus}>
          주문접수
        </ButtonStyle>
      );
    }
  };
  return (
    <>
      {data ? (
        <OrderManageDetailWrapper>
          <CloseButtonWrapper>
            <button type="button" onClick={closeModal}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </CloseButtonWrapper>
          {data.bookInfo.basics && (
            <div className={styles.main__wrapper}>
              {data.bookInfo.basics.type !== "custom" ? (
                <>
                  <div className={styles.main__div__wrapper}>
                    <div className={styles.main__div}>
                      <ProfileImage
                        size="small_medium"
                        url={data.bookInfo.basics.image}
                      />
                      <div className={styles.sub__div}>
                        <p className={styles.title__p}>
                          상호명: {data.bookInfo.basics.storeName}
                        </p>
                        <p className={styles.title__sub__p}>
                          예약 번호: {data.bookInfo.basics.bookId} <br />
                          예약 일시: {data.bookInfo.basics.dueDate} (주문일시 :{" "}
                          {data.bookInfo.basics.bookDate}) <br />
                          {data.bookInfo.basics.type === "custom" && (
                            <p>요청사항: {data.bookInfo.basics.request}</p>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}

              {data.bookInfo.basics.type === "custom" && (
                <>
                  <div className={styles.line}></div>
                  <p className={styles.flower__detail__title}>
                    꽃다발 상세정보
                  </p>
                  <div className={styles.flower__detail}>
                    <div className={styles.flower__img}>
                      <FlowerImg src={data.bookInfo.basics.image} />
                    </div>
                    <div className={styles.sub__div__wrapper}>
                      <h1 className={styles.main__p}>
                        {bunchList[data.bookInfo.details.size]}송이{" "}
                        {data.bookInfo.details.type}
                      </h1>
                      <p className={styles.sub__p}>
                        {data.bookInfo.details.wrapper} |{" "}
                        {data.bookInfo.details.ribbon}
                      </p>
                      <p className={styles.line}></p>
                      {data.bookInfo.details.flowers.map((flower, index) => (
                        <p className={styles.description} key={index}>
                          {flower}
                        </p>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          <OrderButtonWrapper>{renderButton()}</OrderButtonWrapper>
        </OrderManageDetailWrapper>
      ) : (
        <></>
      )}
    </>
  );
};

export default OrderManageDetail;
