import Chat from "../chat/Chat";
import Header from "./Header";
import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <main className={styles.layout}>
      <Header />
      {children}
      <Chat />
    </main>
  );
};

export default Layout;
