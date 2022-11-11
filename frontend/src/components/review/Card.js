import styled from "styled-components";

const CardWrapper = styled.div`
  padding: 12px 40px;
  border: 4px solid #eee;
  border-left: transparent;
  box-sizing: border-box;
  border-radius: 36px;
  width: 60%;
  min-width: 500px;
  margin: 0 auto;
  position: relative;
  height: 120px;
  display: flex;
  align-items: center;
  &::before {
    position: absolute;
    top: -2px;
    left: 3px;
    content: "";
    width: 30px;
    height: 103%;
    border-radius: 36px 0 0 36px;
    background-color: cornflowerblue;
  }
`;

const Card = () => {
  return (
    <CardWrapper>
      <div>
        <div>
          <div>이름 : 단무지</div>
          <div>4.5</div>
        </div>
        <div>꽃다발 이쁘다요</div>
      </div>
    </CardWrapper>
  );
};

export default Card;
