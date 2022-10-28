import styled from "styled-components";

const FlexBox = styled.div`
  display: flex;
  padding: ${(props) => props.padding};
  flex-direction: ${(props) => {
    props.col ? "column" : "row";
  }};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
`;
FlexBox.defaultProps = {
  width: "100%",
};

const Flex = ({
  children,
  padding,
  col,
  justifyContent,
  alignItems,
  width,
  margin,
}) => {
  return (
    <FlexBox
      padding
      justifyContent={justifyContent}
      alignItems={alignItems}
      col
      width={width}
      margin={margin}
    >
      {children}
    </FlexBox>
  );
};

export default Flex;
