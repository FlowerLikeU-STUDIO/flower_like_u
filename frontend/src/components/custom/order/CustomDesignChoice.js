import FlowerImg from "@/components/common/FlowerImg";
import { client } from "@/pages/api/client";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import styles from "./CustomFlorist.module.scss";

const CustomChoiceWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: space-around;
  padding: 10px 0px;
  align-items: center;
  position: relative;
`;
const CustomDesignWrapper = styled.div`
  display: grid;
  width: 70%;
  height: 100%;
  grid-row-gap: 0.5rem;
  grid-column-gap: 50px;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
`;

const CustomFlowerItemWrapper = styled.div`
  border-radius: 16px;
  border: 1px solid #eee;
  padding: 4px;
  max-height: 230px;
  cursor: pointer;
  &.choice {
    border: 4px solid #ffa7a5;
  }
  &:hover {
    border: 4px solid #ffa7a5;
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const fetcher = (url) => client.get(url).then((res) => res.data);
const Page = ({ pageIndex, choiceDesign, flowerId }) => {
  const { data } = useSWR(`custom?page=${pageIndex + 1}&size=6`, fetcher);
  const router = useRouter();
  if (data && !data.designList) {
    return (
      <div>
        <p></p>
        <p onClick={() => router.replace("/custom")}>
          🌸🌹 등록된 디자인이 없습니다. 나만의 꽃을 디자인해보세요.🌻🌼
        </p>
      </div>
    );
  } else {
    return (
      <CustomDesignWrapper>
        {data &&
          data.designList.map((design) => (
            <CustomFlowerItemWrapper
              key={design.designId}
              className={flowerId === design.designId ? "choice" : ""}
              onClick={() => choiceDesign(design.designId)}
            >
              <FlowerImg src={design.image} />
            </CustomFlowerItemWrapper>
          ))}
      </CustomDesignWrapper>
    );
  }
};

const CustomDesignChoice = ({
  flowerId,
  setStep,
  setFlowerId,
  exitCustomResgister,
}) => {
  const [pageIndex, setPageIndex] = useState(0);
  const { data } = useSWR(`custom?page=${pageIndex + 1}&size=6`, fetcher);

  const choiceDesign = (designId) => {
    setFlowerId(designId);
    setStep("resservation");
  };

  const closeModal = () => {
    exitCustomResgister();
  };
  return (
    <CustomChoiceWrapper>
      <ButtonWrapper>
        <div className={styles.button_wrapper}>
          <button className={styles.close} onClick={closeModal}>
            <span className="material-icons-outlined">close</span>
          </button>
        </div>
      </ButtonWrapper>
      <div>
        {pageIndex === 0 ? (
          <></>
        ) : (
          <button
            type="button"
            onClick={() => {
              setPageIndex(pageIndex - 1);
            }}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
        )}
      </div>

      <Page
        pageIndex={pageIndex}
        choiceDesign={choiceDesign}
        flowerId={flowerId}
      />
      <div style={{ display: "none" }}>
        <Page pageIndex={pageIndex + 1} />
      </div>

      <div>
        {data && data.maxPage === pageIndex + 1 ? (
          <></>
        ) : (
          <button
            type="button"
            onClick={() => {
              setPageIndex(pageIndex + 1);
            }}
          >
            <i className="fa-regular fa-chevron-right"></i>
          </button>
        )}
      </div>
    </CustomChoiceWrapper>
  );
};

export default CustomDesignChoice;
