import styles from "./index.module.scss";
import ProfileImage from "@/components/mypage/common/ProfileImage";
import Link from "next/link";

const Custom = () => {
  return (
    <div className={styles.testbox}>
      <Link href="/custom/package">커스텀 시작하기</Link>
    </div>
  );
};

export default Custom;
