import Image from "next/image";
import styled from "styled-components";
import Circle from "@/components/Circle";

const HomeWrapper = styled.div`
  position: relative;
`;

const HomeFlower = styled.div`
  position: absolute;
  margin: 0;
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  top: ${(props) => props.top};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  z-index: -1;

  &.left {
    @media all and (max-width: 1024px) {
      top: 0px;
    }
    @media all and (max-width: 768px) {
      width: 280px;
      height: 400px;
      top: 0px;
    }
    @media screen and (max-width: 556px) {
      width: 200px;
      height: 300px;
      top: 0px;
    }
  }
  &.right {
    @media all and (max-width: 1024px) {
      width: 500px;
      height: 570px;
      right: -198px;
      top: -16px;
    }
    @media all and (max-width: 768px) {
      right: -205px;
      width: 500px;
      height: 570px;
      top: -50px;
    }
    @media screen and (max-width: 556px) {
      right: -165px;
      width: 400px;
      height: 400px;
      top: 0px;
    }
  }
`;

const Section = styled.section`
  display: flex;
  padding: 400px 0px 0px 0px;
  position: relative;
  /* top: -1300px; */
  align-items: center;
  justify-content: space-around;
  & {
    @media screen and (max-width: 556px) {
      padding: 200px 0px 0px 0px;
    }
  }
`;

const Bouquet = styled.div`
  position: relative;
  width: 380px;
  height: 600px;
  & {
    @media screen and (max-width: 556px) {
      width: 200px;
      height: 300px;
    }
  }
`;

const HomeTitleWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 10%;
  transform: translate(-50%, 0%);
`;
const Home = () => {
  return (
    <HomeWrapper>
      <Circle />
      <HomeTitleWrapper>
        <h1>너를 닮은 꽃</h1>
      </HomeTitleWrapper>
      <Section>
        <HomeFlower left={"-8px"} top={"120px"} width={"400px"} height={"600px"} className={"left"}>
          <Image src={"/home/homeFlowerLeft.png"} layout={"fill"} />
        </HomeFlower>
        <HomeFlower right={"-370px"} top={"0px"} width={"900px"} height={"1000px"} className={"right"}>
          <Image src={"/home/homeFlowerRight.png"} layout={"fill"} />
        </HomeFlower>
        <div>
          <div>1번애용</div>
          <div>3번애용</div>
        </div>
        <Bouquet>
          <Image src={"/home/centerFlower.png"} layout="fill" />
        </Bouquet>
        <div>
          <div>2번애용</div>
          <div>4번애용</div>
        </div>
      </Section>
    </HomeWrapper>
  );
};

export default Home;
