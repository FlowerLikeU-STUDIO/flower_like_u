import styled from "styled-components";

const LayoutWrapper = styled.div`
  position: relative;
  display: flex;
  margin: 0 auto;
  width: 90%;
  max-width: 75rem;
`;

const MyPageLayout = ({ children }) => {
  return <LayoutWrapper>{children}</LayoutWrapper>;
};

export default MyPageLayout;
