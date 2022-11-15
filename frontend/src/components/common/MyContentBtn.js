import styles from "./MyContentBtn.module.scss";
import Button from "@/components/common/Button";
import { useRouter } from "next/router";

const MyContentBtn = ({ props }) => {
  const pagePath = { consumer: ["reservation", "order", "design"], store: ["feeds", "reviews", "order-manage"] };

  //* 버튼 내용을 한글로 변환
  const buttonList = { consumer: ["예약 목록", "지난 주문 내역", "내 디자인"], store: ["피드", "주문관리", "후기"] };

  if (!props) return;
  const path = pagePath[props];
  const router = useRouter();
  const currentPath = router.pathname.split("/")[2];

  return (
    <nav className={styles.line_button_wrapper}>
      <div className={styles.btn__div}>
        <Button
          size="medium"
          color={path[0] === currentPath ? "solid_pink_active" : "solid_pink"}
          link={`/mypage/${path[0]}`}
        >
          {buttonList[props][0]}
        </Button>
        <Button
          size="medium"
          color={path[1] === currentPath ? "solid_pink_active" : "solid_pink"}
          link={`/mypage/${path[1]}`}
        >
          {buttonList[props][1]}
        </Button>
        <Button
          size="medium"
          color={path[2] === currentPath ? "solid_pink_active" : "solid_pink"}
          link={`/mypage/${path[2]}`}
        >
          {buttonList[props][2]}
        </Button>
      </div>
    </nav>
  );
};

export default MyContentBtn;
