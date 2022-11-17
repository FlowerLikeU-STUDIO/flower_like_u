const { default: Image } = require("next/image");
const { default: styled } = require("styled-components");

const BadgeWrapper = styled.div`
  position: absolute;
`;
const BadgeImageWrapper = styled.div`
  position: relative;
  width: 1rem;
  height: 1rem;
`;
const HolidayBadge = () => {
  return (
    <BadgeImageWrapper>
      <Image
        src={"/calendar/holidayBadge.png"}
        layout={"fill"}
        objectFit={"contain"}
      />
    </BadgeImageWrapper>
  );
};

export default HolidayBadge;
