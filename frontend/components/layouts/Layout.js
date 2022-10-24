import styled from "styled-components";
import Chat from "../chat/Chat";
import Header from "./Header";

const LayoutWrapper = styled.div`
  position: relative;
  width: 100vw;
  max-width: 1680px;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
`;
const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Header />
      {children}
      <Chat />
    </LayoutWrapper>
  );
};

export default Layout;
